import { Module } from '@nestjs/common';
import { StrapiClientModule } from '../strapi-client/strapi-client.module';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';

@Module({
  imports: [StrapiClientModule],
  providers: [DishesService],
  controllers: [DishesController],
})
export class DishesModule {}
