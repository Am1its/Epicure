import { render, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import type { CartItem, Dish } from '@org/shared-types';

const mockDishA: Dish = { id: 1, name: 'Pad Ki Mao', price: 88 };
const mockDishB: Dish = { id: 2, name: 'Red Farm', price: 65 };

const itemA: CartItem = {
  dish: mockDishA,
  imageUrl: '/a.jpg',
  quantity: 1,
  selectedChanges: [],
  restaurantId: 10,
  restaurantName: 'Mashya',
};

const itemB: CartItem = {
  dish: mockDishB,
  imageUrl: '/b.jpg',
  quantity: 1,
  selectedChanges: [],
  restaurantId: 20,
  restaurantName: 'Claro',
};

function TestConsumer({ onRender }: { onRender: (val: ReturnType<typeof useCart>) => void }) {
  const cart = useCart();
  onRender(cart);
  return null;
}

function setup() {
  let cartValue: ReturnType<typeof useCart>;
  render(
    <CartProvider>
      <TestConsumer onRender={v => { cartValue = v; }} />
    </CartProvider>
  );
  return () => cartValue!;
}

describe('CartContext', () => {
  beforeEach(() => localStorage.clear());

  it('starts empty', () => {
    const getCart = setup();
    expect(getCart().cartItems).toHaveLength(0);
    expect(getCart().totalItems).toBe(0);
    expect(getCart().totalPrice).toBe(0);
  });

  it('addToCart adds an item', () => {
    const getCart = setup();
    act(() => { getCart().addToCart(itemA); });
    expect(getCart().cartItems).toHaveLength(1);
    expect(getCart().totalItems).toBe(1);
    expect(getCart().totalPrice).toBe(88);
    expect(getCart().restaurantId).toBe(10);
    expect(getCart().restaurantName).toBe('Mashya');
  });

  it('addToCart increments quantity for the same dish', () => {
    const getCart = setup();
    act(() => { getCart().addToCart(itemA); });
    act(() => { getCart().addToCart(itemA); });
    expect(getCart().cartItems).toHaveLength(1);
    expect(getCart().cartItems[0].quantity).toBe(2);
    expect(getCart().totalItems).toBe(2);
    expect(getCart().totalPrice).toBe(176);
  });

  it('addToCart adds separate line for different dish, same restaurant', () => {
    const getCart = setup();
    act(() => { getCart().addToCart(itemA); });
    act(() => { getCart().addToCart({ ...itemB, restaurantId: 10, restaurantName: 'Mashya' }); });
    expect(getCart().cartItems).toHaveLength(2);
  });

  it('conflictsWithCart returns false when cart is empty', () => {
    const getCart = setup();
    expect(getCart().conflictsWithCart(99)).toBe(false);
  });

  it('conflictsWithCart returns false for same restaurant', () => {
    const getCart = setup();
    act(() => { getCart().addToCart(itemA); });
    expect(getCart().conflictsWithCart(10)).toBe(false);
  });

  it('conflictsWithCart returns true for different restaurant', () => {
    const getCart = setup();
    act(() => { getCart().addToCart(itemA); });
    expect(getCart().conflictsWithCart(20)).toBe(true);
  });

  it('removeFromCart removes the item', () => {
    const getCart = setup();
    act(() => { getCart().addToCart(itemA); });
    act(() => { getCart().removeFromCart(1); });
    expect(getCart().cartItems).toHaveLength(0);
    expect(getCart().restaurantId).toBeNull();
  });

  it('clearCart resets all state', () => {
    const getCart = setup();
    act(() => { getCart().addToCart(itemA); });
    act(() => { getCart().clearCart(); });
    expect(getCart().cartItems).toHaveLength(0);
    expect(getCart().restaurantId).toBeNull();
    expect(getCart().comment).toBe('');
  });

  it('setComment updates comment', () => {
    const getCart = setup();
    act(() => { getCart().setComment('no onions'); });
    expect(getCart().comment).toBe('no onions');
  });
});
