import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users.controller';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ChefsModule } from './chefs/chefs.module';
import { DishesModule } from './dishes/dishes.module';

@Module({
  imports: [RestaurantsModule, ChefsModule, DishesModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
