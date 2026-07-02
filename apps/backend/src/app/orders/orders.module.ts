import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { StrapiClientModule } from '../strapi-client/strapi-client.module';

@Module({
  imports: [StrapiClientModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
