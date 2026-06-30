import type { Order, CartItem } from '@org/shared-types';

export function orderToCartItems(order: Order): CartItem[] {
  return order.items.map(item => ({
    dish: { id: item.dishId, name: item.name, price: item.price },
    imageUrl: item.imageUrl,
    quantity: item.quantity,
    selectedSide: item.selectedSide,
    selectedChanges: item.selectedChanges,
    restaurantId: order.restaurantId,
    restaurantName: order.restaurantName,
  }));
}
