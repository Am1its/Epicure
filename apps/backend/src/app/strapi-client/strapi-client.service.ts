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

  async get<T>(path: string): Promise<T[]> {
    const res = await this.request(path);
    if (!res.ok) {
      throw new ServiceUnavailableException(`Strapi returned ${res.status}`);
    }
    const body = await this.parseJson<StrapiListResponse<T>>(res);
    return body.data ?? [];
  }

  async getById<T>(path: string): Promise<T> {
    const res = await this.request(path);
    if (res.status === 404) throw new NotFoundException('Resource not found');
    if (!res.ok) throw new ServiceUnavailableException(`Strapi returned ${res.status}`);
    const body = await this.parseJson<StrapiSingleResponse<T>>(res);
    return body.data;
  }

  async post<T>(path: string, body: Record<string, unknown>): Promise<T> {
    const res = await this.request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
