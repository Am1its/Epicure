import { Controller, Get, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import type { Order, CreateOrderRequest } from '@org/shared-types';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Headers('authorization') auth: string | undefined, @Body() body: CreateOrderRequest): Promise<Order> {
    return this.ordersService.create(this.extractToken(auth), body);
  }

  @Get()
  findAll(@Headers('authorization') auth: string | undefined): Promise<Order[]> {
    return this.ordersService.findForUser(this.extractToken(auth));
  }

  private extractToken(auth?: string): string {
    if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException('Missing authentication token');
    return auth.slice('Bearer '.length);
  }
}
