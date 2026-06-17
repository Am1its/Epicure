import { Injectable } from '@nestjs/common';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiAuthResponse } from '../strapi-client/strapi-types';
import type { AuthResponse } from '@org/shared-types';

@Injectable()
export class AuthService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.strapiClient.post<StrapiAuthResponse>('/api/auth/local', {
      identifier: email,
      password,
    });
    return this.transform(data);
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const data = await this.strapiClient.post<StrapiAuthResponse>('/api/auth/local/register', {
      username: name,
      email,
      password,
    });
    return this.transform(data);
  }

  private transform(data: StrapiAuthResponse): AuthResponse {
    return {
      jwt: data.jwt,
      user: {
        id: data.user.id,
        name: data.user.username,
        email: data.user.email,
      },
    };
  }
}
