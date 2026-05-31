import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import type { Chef } from '@org/shared-types';
import { ChefsService } from './chefs.service';

@Controller('chefs')
export class ChefsController {
  constructor(private readonly chefsService: ChefsService) {}

  @Get()
  findAll(): Promise<Chef[]> {
    return this.chefsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Chef> {
    return this.chefsService.findOne(id);
  }
}
