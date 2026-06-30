import type { Order, OrderItem, CreateOrderRequest } from './strapi.types';

describe('order types', () => {
  it('compose into a valid order request', () => {
    const item: OrderItem = {
      dishId: 1, name: 'Pad Ki Mao', price: 88, quantity: 2,
      imageUrl: '/x.jpg', selectedChanges: [],
    };
    const req: CreateOrderRequest = {
      restaurantId: 3, restaurantName: 'Mashya', items: [item],
      total: 176, delivery: { name: 'A', address: 'B', phone: '050' },
    };
    const order: Order = { id: 9, ...req, createdAt: new Date().toISOString() };
    expect(order.items[0].name).toBe('Pad Ki Mao');
    expect(order.total).toBe(176);
  });
});
