import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { StrapiClientModule } from '../strapi-client/strapi-client.module';

@Module({
  imports: [StrapiClientModule],
  controllers: [NavigationController],
  providers: [NavigationService],
})
export class NavigationModule {}
