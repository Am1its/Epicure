import { Injectable } from '@nestjs/common';
import type { Order, CreateOrderRequest } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiOrder, StrapiSingleResponse } from '../strapi-client/strapi-types';

@Injectable()
export class OrdersService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  // Use admin token from env for Strapi writes — avoids "Invalid key user" when
  // the user's Strapi JWT doesn't match the current DB (e.g. after a DB reset).
  private get adminToken(): string | undefined {
    return process.env['STRAPI_ADMIN_TOKEN'] ?? undefined;
  }

  async create(userToken: string, req: CreateOrderRequest): Promise<Order> {
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
    const token = this.adminToken ?? userToken;
    const res = await this.strapiClient.post<StrapiSingleResponse<StrapiOrder>>('/api/orders', payload, token);
    return this.transform(res.data);
  }

  async findForUser(userToken: string): Promise<Order[]> {
    const token = this.adminToken ?? userToken;
    const items = await this.strapiClient.get<StrapiOrder>('/api/orders?sort=createdAt:desc&pagination[pageSize]=100', token);
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
