'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem } from '@org/shared-types';

interface CartState {
  cartItems: CartItem[];
  restaurantId: number | null;
  restaurantName: string | null;
  comment: string;
}

interface CartContextValue extends CartState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (dishId: number) => void;
  clearCart: () => void;
  setComment: (comment: string) => void;
  conflictsWithCart: (restaurantId: number) => boolean;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'epicure-cart';

const EMPTY_STATE: CartState = {
  cartItems: [],
  restaurantId: null,
  restaurantName: null,
  comment: '',
};

function itemsMatch(a: CartItem, b: CartItem): boolean {
  return (
    a.dish.id === b.dish.id &&
    a.selectedSide === b.selectedSide &&
    a.selectedChanges.length === b.selectedChanges.length &&
    a.selectedChanges.every((c, i) => c === b.selectedChanges[i])
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(EMPTY_STATE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState(JSON.parse(saved));
    } catch { /* ignore corrupted localStorage */ }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function addToCart(item: CartItem) {
    setState(prev => {
      const existing = prev.cartItems.find(c => itemsMatch(c, item));
      if (existing) {
        return {
          ...prev,
          cartItems: prev.cartItems.map(c =>
            itemsMatch(c, item) ? { ...c, quantity: c.quantity + item.quantity } : c
          ),
        };
      }
      return {
        ...prev,
        cartItems: [...prev.cartItems, item],
        restaurantId: item.restaurantId,
        restaurantName: item.restaurantName,
      };
    });
  }

  function removeFromCart(dishId: number) {
    setState(prev => {
      const updated = prev.cartItems.filter(c => c.dish.id !== dishId);
      return {
        ...prev,
        cartItems: updated,
        restaurantId: updated.length ? prev.restaurantId : null,
        restaurantName: updated.length ? prev.restaurantName : null,
      };
    });
  }

  function clearCart() {
    setState(EMPTY_STATE);
  }

  function setComment(comment: string) {
    setState(prev => ({ ...prev, comment }));
  }

  function conflictsWithCart(incomingRestaurantId: number): boolean {
    return state.cartItems.length > 0 && state.restaurantId !== incomingRestaurantId;
  }

  const totalPrice = state.cartItems.reduce(
    (sum, c) => sum + c.dish.price * c.quantity,
    0
  );
  const totalItems = state.cartItems.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        clearCart,
        setComment,
        conflictsWithCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
