import { Module } from '@nestjs/common';
import { StrapiClientModule } from '../strapi-client/strapi-client.module';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';

@Module({
  imports: [StrapiClientModule],
  providers: [RestaurantsService],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
