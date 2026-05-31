import { Module } from '@nestjs/common';
import { StrapiClientService } from './strapi-client.service';

@Module({
  providers: [StrapiClientService],
  exports: [StrapiClientService],
})
export class StrapiClientModule {}
