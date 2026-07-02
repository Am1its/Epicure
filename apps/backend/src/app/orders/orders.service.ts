import { Injectable } from '@nestjs/common';
import type { Order, CreateOrderRequest } from '@org/shared-types';
import { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { StrapiOrder, StrapiSingleResponse } from '../strapi-client/strapi-types';

@Injectable()
export class OrdersService {
  constructor(private readonly strapiClient: StrapiClientService) {}

  // Use admin token from env for the actual Strapi read/write — the admin token authenticates
  // as no particular Strapi user, so we still resolve the caller's real user id via
  // getUserId() and pass it explicitly for ownership/filtering.
  // Note: getUserId() itself still requires the caller's JWT to resolve against a live user
  // record in Strapi. It does NOT survive a Strapi DB reset — a JWT for a user id that no
  // longer exists fails here before the admin token is ever used. That's intentional: the
  // admin token protects the write/read from becoming misauthenticated, not from serving a
  // stale session. After a DB reset, users must log out and back in to get a fresh JWT.
  private get adminToken(): string | undefined {
    return process.env['STRAPI_ADMIN_TOKEN'] ?? undefined;
  }

  async create(userToken: string, req: CreateOrderRequest): Promise<Order> {
    const userId = await this.strapiClient.getUserId(userToken);
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
        user: userId,
      },
    };
    const token = this.adminToken ?? userToken;
    const res = await this.strapiClient.post<StrapiSingleResponse<StrapiOrder>>('/api/orders', payload, token);
    return this.transform(res.data);
  }

  async findForUser(userToken: string): Promise<Order[]> {
    const userId = await this.strapiClient.getUserId(userToken);
    const token = this.adminToken ?? userToken;
    const items = await this.strapiClient.get<StrapiOrder>(
      `/api/orders?sort=createdAt:desc&pagination[pageSize]=100&filters[user]=${userId}`,
      token,
    );
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
