import { Injectable } from '@nestjs/common';
import type { Dish, StrapiImage } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';

interface StrapiDish {
  id: number;
  name: string;
  description?: string;
  price: number;
  type?: 'Spicy' | 'Vegan' | 'Vegetarian';
  image?: StrapiImage;
  mealTime?: 'Breakfast' | 'Lunch' | 'Dinner';
  isSignatureDish?: boolean;
  [key: string]: unknown;
}

@Injectable()
export class DishesService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async findAll(): Promise<Dish[]> {
    const items = await this.strapiClient.get<StrapiDish>('/api/dishes?populate=*');
    return items.map(item => this.transform(item));
  }

  async findOne(id: number): Promise<Dish> {
    const item = await this.strapiClient.getOne<StrapiDish>(
      `/api/dishes?filters[id][$eq]=${id}&populate=*`,
    );
    return this.transform(item);
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
    };
  }
}
