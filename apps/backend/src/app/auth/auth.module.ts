import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StrapiClientModule } from '../strapi-client/strapi-client.module';

@Module({
  imports: [StrapiClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
