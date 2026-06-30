import { orderToCartItems } from './orderMapping';
import type { Order } from '@org/shared-types';

describe('orderToCartItems', () => {
  const order: Order = {
    id: 1, restaurantId: 3, restaurantName: 'Mashya',
    items: [
      { dishId: 7, name: 'Pad Ki Mao', price: 88, quantity: 2, imageUrl: '/p.jpg', selectedSide: 'White bread', selectedChanges: ['Less spicy'] },
    ],
    comment: 'no peanuts', total: 176, createdAt: '2026-06-29T08:00:00.000Z',
  };

  it('maps order items to cart items carrying restaurant context', () => {
    const result = orderToCartItems(order);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      dish: { id: 7, name: 'Pad Ki Mao', price: 88 },
      imageUrl: '/p.jpg',
      quantity: 2,
      selectedSide: 'White bread',
      selectedChanges: ['Less spicy'],
      restaurantId: 3,
      restaurantName: 'Mashya',
    });
  });
});
