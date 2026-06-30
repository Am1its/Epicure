import { OrdersService } from './orders.service';
import type { StrapiClientService } from '../strapi-client/strapi-client.service';
import type { CreateOrderRequest } from '@org/shared-types';

describe('OrdersService', () => {
  function makeClient(overrides: Partial<StrapiClientService>): StrapiClientService {
    return { get: jest.fn(), post: jest.fn(), getById: jest.fn(), ...overrides } as unknown as StrapiClientService;
  }

  const req: CreateOrderRequest = {
    restaurantId: 3, restaurantName: 'Mashya',
    items: [{ dishId: 1, name: 'Pad Ki Mao', price: 88, quantity: 2, imageUrl: '/x.jpg', selectedChanges: [] }],
    comment: 'no peanuts', total: 176,
    delivery: { name: 'Moshe', address: 'Har Sinai 1', phone: '052123456' },
  };

  it('create maps the request into a Strapi payload and forwards the token', async () => {
    const post = jest.fn().mockResolvedValue({
      data: { id: 9, restaurantId: 3, restaurantName: 'Mashya', items: req.items, comment: 'no peanuts', total: 176, createdAt: '2026-06-29T08:00:00.000Z' },
    });
    const service = new OrdersService(makeClient({ post }));

    const result = await service.create('tok123', req);

    expect(post).toHaveBeenCalledWith(
      '/api/orders',
      { data: { restaurantId: 3, restaurantName: 'Mashya', items: req.items, comment: 'no peanuts', total: 176, deliveryName: 'Moshe', deliveryAddress: 'Har Sinai 1', deliveryPhone: '052123456' } },
      'tok123',
    );
    expect(result).toEqual({ id: 9, restaurantId: 3, restaurantName: 'Mashya', items: req.items, comment: 'no peanuts', total: 176, createdAt: '2026-06-29T08:00:00.000Z' });
  });

  it('findForUser forwards the token and sorts by createdAt desc', async () => {
    const get = jest.fn().mockResolvedValue([
      { id: 9, restaurantId: 3, restaurantName: 'Mashya', items: [], total: 176, createdAt: '2026-06-29T08:00:00.000Z' },
    ]);
    const service = new OrdersService(makeClient({ get }));

    const result = await service.findForUser('tok123');

    expect(get).toHaveBeenCalledWith('/api/orders?sort=createdAt:desc', 'tok123');
    expect(result).toHaveLength(1);
    expect(result[0].restaurantName).toBe('Mashya');
  });
});
