import {
  Injectable,
  HttpException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

const STRAPI_URL = process.env['STRAPI_URL'] ?? 'http://localhost:1337';

interface StrapiListResponse<T> {
  data: T[];
}

interface StrapiSingleResponse<T> {
  data: T;
}

@Injectable()
export class StrapiClientService {
  async get<T>(path: string): Promise<T[]> {
    let res: Response;
    try {
      res = await fetch(`${STRAPI_URL}${path}`);
    } catch {
      throw new ServiceUnavailableException('Strapi is unreachable');
    }
    if (!res.ok) {
      throw new ServiceUnavailableException(`Strapi returned ${res.status}`);
    }
    let body: StrapiListResponse<T>;
    try {
      body = (await res.json()) as StrapiListResponse<T>;
    } catch {
      throw new ServiceUnavailableException('Strapi returned invalid JSON');
    }
    return body.data ?? [];
  }

  async getById<T>(path: string): Promise<T> {
    let res: Response;
    try {
      res = await fetch(`${STRAPI_URL}${path}`);
    } catch {
      throw new ServiceUnavailableException('Strapi is unreachable');
    }
    if (res.status === 404) {
      throw new NotFoundException('Resource not found');
    }
    if (!res.ok) {
      throw new ServiceUnavailableException(`Strapi returned ${res.status}`);
    }
    let body: StrapiSingleResponse<T>;
    try {
      body = (await res.json()) as StrapiSingleResponse<T>;
    } catch {
      throw new ServiceUnavailableException('Strapi returned invalid JSON');
    }
    return body.data;
  }

  async post<T>(path: string, body: Record<string, unknown>): Promise<T> {
    let res: Response;
    try {
      res = await fetch(`${STRAPI_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch {
      throw new ServiceUnavailableException('Strapi is unreachable');
    }
    if (!res.ok) {
      let message = `Strapi returned ${res.status}`;
      try {
        const errBody = (await res.json()) as { error?: { message?: string }; message?: string };
        message = errBody?.error?.message ?? errBody?.message ?? message;
      } catch { /* ignore */ }
      throw new HttpException({ message }, res.status);
    }
    let result: T;
    try {
      result = (await res.json()) as T;
    } catch {
      throw new ServiceUnavailableException('Strapi returned invalid JSON');
    }
    return result;
  }
}
