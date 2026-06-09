import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ChefsModule } from './chefs/chefs.module';
import { DishesModule } from './dishes/dishes.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [RestaurantsModule, ChefsModule, DishesModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
