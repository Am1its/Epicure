import { Injectable } from '@nestjs/common';
import type { SearchResults } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';

@Injectable()
export class SearchService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async search(q: string): Promise<SearchResults> {
    const query = q.trim();
    if (!query) return { restaurants: [], chefs: [] };

    const [restaurants, chefs] = await Promise.all([
      this.strapiClient.get<{ id: number; name: string }>(
        `/api/restaurants?filters[name][$containsi]=${encodeURIComponent(query)}&fields[0]=id&fields[1]=name&pagination[pageSize]=5`,
      ),
      this.strapiClient.get<{ id: number; name: string }>(
        `/api/chefs?filters[name][$containsi]=${encodeURIComponent(query)}&fields[0]=id&fields[1]=name&pagination[pageSize]=3`,
      ),
    ]);

    return {
      restaurants: restaurants.map(r => ({ id: r.id, name: r.name })),
      chefs: chefs.map(c => ({ id: c.id, name: c.name })),
    };
  }
}
