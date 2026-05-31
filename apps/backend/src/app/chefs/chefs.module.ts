import { Module } from '@nestjs/common';
import { StrapiClientModule } from '../strapi-client/strapi-client.module';
import { ChefsService } from './chefs.service';
import { ChefsController } from './chefs.controller';

@Module({
  imports: [StrapiClientModule],
  providers: [ChefsService],
  controllers: [ChefsController],
})
export class ChefsModule {}
