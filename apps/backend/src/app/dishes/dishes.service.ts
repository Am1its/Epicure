import { Injectable, NotFoundException } from '@nestjs/common';
import type { Dish } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiDish } from '../strapi-client/strapi-types';

@Injectable()
export class DishesService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async findAll(): Promise<Dish[]> {
    const items = await this.strapiClient.get<StrapiDish>('/api/dishes?populate=*');
    return items.map(item => this.transform(item));
  }

  async findOne(id: number): Promise<Dish> {
    const items = await this.strapiClient.get<StrapiDish>(
      `/api/dishes?filters[id][$eq]=${id}&populate=*`,
    );
    if (!items.length) throw new NotFoundException('Dish not found');
    return this.transform(items[0]);
  }

  private transform(item: StrapiDish): Dish {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      type: item.type,
      image: item.image,
      mealTime: item.mealTime,
      isSignatureDish: item.isSignatureDish,
      sides: item.sides,
      changes: item.changes,
    };
  }
}
