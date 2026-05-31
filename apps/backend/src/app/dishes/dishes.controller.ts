import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import type { Dish } from '@org/shared-types';
import { DishesService } from './dishes.service';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  findAll(): Promise<Dish[]> {
    return this.dishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Dish> {
    return this.dishesService.findOne(id);
  }
}
