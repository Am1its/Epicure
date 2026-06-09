import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import type { Restaurant } from '@org/shared-types';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Post('distances')
  findAllWithDistances(@Body() body: { lat: number; lng: number }): Promise<Restaurant[]> {
    return this.restaurantsService.findAllWithDistances(body.lat, body.lng);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Restaurant> {
    return this.restaurantsService.findOne(id);
  }
}
