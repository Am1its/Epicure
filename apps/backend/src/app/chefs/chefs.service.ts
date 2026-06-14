import { Injectable, NotFoundException } from '@nestjs/common';
import type { Chef } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiChef } from '../strapi-client/strapi-types';

@Injectable()
export class ChefsService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async findAll(): Promise<Chef[]> {
    const items = await this.strapiClient.get<StrapiChef>('/api/chefs?populate=*&sort=chefOfTheWeekOrder:asc');
    return items.map(item => this.transform(item));
  }

  async findOne(id: number): Promise<Chef> {
    const items = await this.strapiClient.get<StrapiChef>(
      `/api/chefs?filters[id][$eq]=${id}&populate=*`,
    );
    if (!items.length) throw new NotFoundException('Chef not found');
    return this.transform(items[0]);
  }

  private transform(item: StrapiChef): Chef {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      bio: item.bio,
      chefOfTheWeek: item.chefOfTheWeek,
      chefOfTheWeekOrder: item.chefOfTheWeekOrder,
    };
  }
}
