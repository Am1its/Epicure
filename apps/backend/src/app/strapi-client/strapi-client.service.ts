import {
  Injectable,
  HttpException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import type { StrapiSingleResponse } from './strapi-types';

const STRAPI_URL = process.env['STRAPI_URL'] ?? 'http://localhost:1337';

interface StrapiListResponse<T> {
  data: T[];
}

@Injectable()
export class StrapiClientService {
  private async request(path: string, init?: RequestInit): Promise<Response> {
    try {
      return await fetch(`${STRAPI_URL}${path}`, init);
    } catch {
      throw new ServiceUnavailableException('Strapi is unreachable');
    }
  }

  private async parseJson<T>(res: Response): Promise<T> {
    try {
      return (await res.json()) as T;
    } catch {
      throw new ServiceUnavailableException('Strapi returned invalid JSON');
    }
  }

  // Not special-casing 401 here: this method is shared by public content reads
  // (restaurants/chefs/dishes/search — never pass a token) and orders.findForUser
  // (which does). A 401 propagated as UnauthorizedException would make the frontend's
  // fetchApi fire onUnauthorized() and log the user out — wrong for a Strapi permissions
  // misconfiguration on public content. Orders' own frontend calls (fetchOrders/createOrder)
  // already bypass fetchApi/onUnauthorized and only care about the error message, not the
  // status code, so falling through to the generic failure below changes nothing for them.
  async get<T>(path: string, token?: string): Promise<T[]> {
    const res = await this.request(path, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    if (!res.ok) throw new ServiceUnavailableException(`Strapi returned ${res.status}`);
    const body = await this.parseJson<StrapiListResponse<T>>(res);
    return body.data ?? [];
  }

  // Resolves + validates the caller's user id via Strapi's own JWT check, independent
  // of whichever token (user or admin) is used for the actual read/write that follows.
  // A 401 here means the caller's session no longer resolves to a live Strapi user —
  // most commonly a stale JWT after a Strapi DB reset — so the message tells them to
  // re-authenticate rather than surfacing Strapi's generic rejection.
  async getUserId(token: string): Promise<number> {
    const res = await this.request('/api/users/me', { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) throw new UnauthorizedException('Your session has expired — please log in again');
    if (!res.ok) throw new ServiceUnavailableException(`Strapi returned ${res.status}`);
    const body = await this.parseJson<{ id: number }>(res);
    return body.id;
  }

  async getById<T>(path: string): Promise<T> {
    const res = await this.request(path);
    if (res.status === 404) throw new NotFoundException('Resource not found');
    if (!res.ok) throw new ServiceUnavailableException(`Strapi returned ${res.status}`);
    const body = await this.parseJson<StrapiSingleResponse<T>>(res);
    return body.data;
  }

  async post<T>(path: string, body: Record<string, unknown>, token?: string): Promise<T> {
    const res = await this.request(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      let message = `Strapi returned ${res.status}`;
      try {
        const errBody = (await res.json()) as { error?: { message?: string }; message?: string };
        message = errBody?.error?.message ?? errBody?.message ?? message;
      } catch { /* ignore */ }
      throw new HttpException({ message }, res.status);
    }
    return this.parseJson<T>(res);
  }
}
