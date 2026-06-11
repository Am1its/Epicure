import { Module } from '@nestjs/common';
import { StrapiClientModule } from '../strapi-client/strapi-client.module';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [StrapiClientModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
