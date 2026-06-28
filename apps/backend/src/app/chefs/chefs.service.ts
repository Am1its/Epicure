import { Injectable, NotFoundException } from '@nestjs/common';
import type { Chef, ChefRestaurant } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiChef } from '../strapi-client/strapi-types';

const CHEF_POPULATE = [
  'populate[image][fields][0]=url',
  'populate[image][fields][1]=alternativeText',
  'populate[restaurants][fields][0]=id',
  'populate[restaurants][fields][1]=name',
  'populate[restaurants][fields][2]=rating',
  'populate[restaurants][fields][3]=cuisine',
  'populate[restaurants][fields][4]=isPopular',
  'populate[restaurants][fields][5]=latitude',
  'populate[restaurants][fields][6]=longitude',
  'populate[restaurants][fields][7]=openingHours',
  'populate[restaurants][populate][image][fields][0]=url',
  'populate[restaurants][populate][image][fields][1]=alternativeText',
].join('&');
const CHEF_QUERY = `/api/chefs?${CHEF_POPULATE}&sort=chefOfTheWeekOrder:asc`;

@Injectable()
export class ChefsService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async findAll(): Promise<Chef[]> {
    const items = await this.strapiClient.get<StrapiChef>(CHEF_QUERY);
    return items.map(item => this.transform(item));
  }

  async findOne(id: number): Promise<Chef> {
    const items = await this.strapiClient.get<StrapiChef>(
      `/api/chefs?filters[id][$eq]=${id}&${CHEF_POPULATE}`,
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
      restaurants: item.restaurants?.map((r): ChefRestaurant => ({
        id: r.id,
        name: r.name,
        image: r.image,
        rating: r.rating ?? 0,
        cuisine: r.cuisine,
        isPopular: r.isPopular,
        latitude: r.latitude,
        longitude: r.longitude,
        openingHours: r.openingHours,
      })),
    };
  }
}
