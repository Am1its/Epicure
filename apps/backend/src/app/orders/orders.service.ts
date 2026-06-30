import { Injectable } from '@nestjs/common';
import type { Order, CreateOrderRequest } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiOrder, StrapiSingleResponse } from '../strapi-client/strapi-types';

@Injectable()
export class OrdersService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  async create(token: string, req: CreateOrderRequest): Promise<Order> {
    const payload = {
      data: {
        restaurantId: req.restaurantId,
        restaurantName: req.restaurantName,
        items: req.items,
        comment: req.comment,
        total: req.total,
        deliveryName: req.delivery.name,
        deliveryAddress: req.delivery.address,
        deliveryPhone: req.delivery.phone,
      },
    };
    const res = await this.strapiClient.post<StrapiSingleResponse<StrapiOrder>>('/api/orders', payload, token);
    return this.transform(res.data);
  }

  async findForUser(token: string): Promise<Order[]> {
    const items = await this.strapiClient.get<StrapiOrder>('/api/orders?sort=createdAt:desc', token);
    return items.map(o => this.transform(o));
  }

  private transform(o: StrapiOrder): Order {
    return {
      id: o.id,
      restaurantId: o.restaurantId,
      restaurantName: o.restaurantName,
      items: o.items ?? [],
      comment: o.comment,
      total: o.total,
      createdAt: o.createdAt,
    };
  }
}
