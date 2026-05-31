import { Injectable } from '@nestjs/common';
import type { Chef, StrapiImage } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';

interface StrapiChef {
  id: number;
  name: string;
  image?: StrapiImage;
  [key: string]: unknown;
}

@Injectable()
export class ChefsService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async findAll(): Promise<Chef[]> {
    const items = await this.strapiClient.get<StrapiChef>('/api/chefs?populate=*');
    return items.map(item => this.transform(item));
  }

  async findOne(id: number): Promise<Chef> {
    const item = await this.strapiClient.getOne<StrapiChef>(
      `/api/chefs?filters[id][$eq]=${id}&populate=*`,
    );
    return this.transform(item);
  }

  private transform(item: StrapiChef): Chef {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
    };
  }
}
