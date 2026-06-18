import { Injectable } from '@nestjs/common';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiNavigation } from '../strapi-client/strapi-types';
import type { NavigationResponse } from '@org/shared-types';

@Injectable()
export class NavigationService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async getNavigation(): Promise<NavigationResponse> {
    const data = await this.strapiClient.getById<StrapiNavigation>(
      '/api/navigation?populate[logo]=true&populate[navLinks]=true&populate[footerLinks]=true',
    );
    return {
      brandName: data.brandName,
      logoUrl: data.logo?.url ?? null,
      navLinks: (data.navLinks ?? []).map(l => ({ label: l.label, url: l.url })),
      footerLinks: (data.footerLinks ?? []).map(l => ({ label: l.label, url: l.url })),
    };
  }
}
