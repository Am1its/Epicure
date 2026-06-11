import { Injectable } from '@nestjs/common';
import type { Restaurant, Dish } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiRestaurant } from '../strapi-client/strapi-types';
import { haversineKm } from './haversine';

const POPULATE_QUERY =
  '/api/restaurants?populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[chef][fields][0]=name&populate[chef][fields][1]=id&populate[dishes][populate]=*';

@Injectable()
export class RestaurantsService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async findAll(): Promise<Restaurant[]> {
    const items = await this.strapiClient.get<StrapiRestaurant>(POPULATE_QUERY);
    return items.map(item => this.transform(item));
  }

  async findAllWithDistances(userLat: number, userLng: number): Promise<Restaurant[]> {
    if (!isFinite(userLat) || !isFinite(userLng)) {
      throw new Error('lat and lng must be finite numbers');
    }
    const items = await this.strapiClient.get<StrapiRestaurant>(POPULATE_QUERY);
    return items.map(item => {
      const distance =
        item.latitude != null && item.longitude != null
          ? haversineKm(userLat, userLng, item.latitude, item.longitude)
          : undefined;
      return this.transform(item, distance);
    });
  }

  async findOne(id: number): Promise<Restaurant> {
    const item = await this.strapiClient.getById<StrapiRestaurant>(
      `/api/restaurants/${id}?populate[dishes][populate]=*&populate[chef][fields][0]=name&populate[chef][fields][1]=id&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText`,
    );
    return this.transform(item);
  }

  private transform(item: StrapiRestaurant, distance?: number): Restaurant {
    return {
      id: item.id,
      name: item.name,
      rating: item.rating,
      createdAt: item.createdAt,
      image: item.image,
      distance,
      latitude: item.latitude,
      longitude: item.longitude,
      openingHours: item.openingHours,
      chef: item.chef
        ? { id: item.chef.id, name: item.chef.name, image: item.chef.image }
        : undefined,
      isPopular: item.isPopular,
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
