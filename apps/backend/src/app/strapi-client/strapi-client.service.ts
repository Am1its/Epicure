import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

const STRAPI_URL = 'http://localhost:1337';

interface StrapiListResponse<T> {
  data: T[];
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

  async getOne<T>(path: string): Promise<T> {
    const items = await this.get<T>(path);
    if (!items.length) {
      throw new NotFoundException('Resource not found');
    }
    return items[0];
  }
}
