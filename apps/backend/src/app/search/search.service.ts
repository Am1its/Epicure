import { Injectable } from '@nestjs/common';
import type { SearchResults } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';

const CUISINES = [
  'Italian', 'Japanese', 'Thai', 'Mediterranean', 'French',
  'American', 'Israeli', 'Mexican', 'Indian', 'Chinese',
] as const;

@Injectable()
export class SearchService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async search(q: string): Promise<SearchResults> {
    const query = q.trim().slice(0, 100);
    if (!query) return { restaurants: [], chefs: [], cuisines: [] };

    const [restaurants, chefs] = await Promise.all([
      this.strapiClient.get<{ id: number; name: string }>(
        `/api/restaurants?filters[name][$containsi]=${encodeURIComponent(query)}&fields[0]=id&fields[1]=name&pagination[pageSize]=5`,
      ),
      this.strapiClient.get<{ id: number; name: string }>(
        `/api/chefs?filters[name][$containsi]=${encodeURIComponent(query)}&fields[0]=id&fields[1]=name&pagination[pageSize]=3`,
      ),
    ]);

    const matchedCuisines = CUISINES.filter(c =>
      c.toLowerCase().includes(query.toLowerCase()),
    );

    return {
      restaurants: restaurants.map(r => ({ id: r.id, name: r.name })),
      chefs: chefs.map(c => ({ id: c.id, name: c.name })),
      cuisines: matchedCuisines.map(label => ({ label })),
    };
  }
}
