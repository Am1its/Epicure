import { Injectable } from '@nestjs/common';
import type { Restaurant, Dish } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiRestaurant } from '../strapi-client/strapi-types';

@Injectable()
export class RestaurantsService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async findAll(): Promise<Restaurant[]> {
    const items = await this.strapiClient.get<StrapiRestaurant>(
      '/api/restaurants?populate=*',
    );
    return items.map(item => this.transform(item));
  }

  async findOne(id: number): Promise<Restaurant> {
    const item = await this.strapiClient.getOne<StrapiRestaurant>(
      `/api/restaurants?filters[id][$eq]=${id}&populate[dishes][populate]=*&populate[chef][fields][0]=name&populate[chef][fields][1]=id&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText`,
    );
    return this.transform(item);
  }

  private transform(item: StrapiRestaurant): Restaurant {
    return {
      id: item.id,
      name: item.name,
      rating: item.rating,
      createdAt: item.createdAt,
      image: item.image,
      chef: item.chef
        ? { id: item.chef.id, name: item.chef.name, image: item.chef.image }
        : undefined,
      dishes: item.dishes?.map(
        (d): Dish => ({
          id: d.id,
          name: d.name,
          description: d.description,
          price: d.price,
          type: d.type,
          image: d.image,
          mealTime: d.mealTime,
          isSignatureDish: d.isSignatureDish,
        }),
      ),
    };
  }
}
