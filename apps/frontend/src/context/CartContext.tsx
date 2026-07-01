'use client';

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import type { CartItem, Order } from '@org/shared-types';
import { useAuth } from './AuthContext';
import { orderToCartItems } from '../lib/orderMapping';
import { loadCartForUser, saveCartForUser } from '../lib/cartStorage';
import { CartConflictModal } from '../components/CartConflictModal';

interface CartState {
  cartItems: CartItem[];
  restaurantId: number | null;
  restaurantName: string | null;
  comment: string;
}

interface CartContextValue extends CartState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, delta: 1 | -1) => void;
  confirmRemove: (item: CartItem) => void;
  cancelRemove: (item: CartItem) => void;
  clearCart: () => void;
  setComment: (comment: string) => void;
  replaceCart: (order: Order) => void;
  conflictsWithCart: (restaurantId: number) => boolean;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const EMPTY_STATE: CartState = {
  cartItems: [],
  restaurantId: null,
  restaurantName: null,
  comment: '',
};

function isValidCartState(val: unknown): val is CartState {
  return !!val && typeof val === 'object' && Array.isArray((val as Record<string, unknown>)['cartItems']);
}

function itemsMatch(a: CartItem, b: CartItem): boolean {
  const changesA = [...a.selectedChanges].sort();
  const changesB = [...b.selectedChanges].sort();
  return (
    a.dish.id === b.dish.id &&
    a.selectedSide === b.selectedSide &&
    changesA.length === changesB.length &&
    changesA.every((c, i) => c === changesB[i])
  );
}

// Reads the saved user ID from auth localStorage so cart can be initialised
// synchronously on the client without waiting for a useEffect.
function readAuthUserId(): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('epicure_auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { user?: { id?: number } };
    return parsed?.user?.id ?? null;
  } catch { return null; }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const initialUserId = readAuthUserId();

  const [state, setState] = useState<CartState>(() => {
    if (typeof window === 'undefined') return EMPTY_STATE;
    const saved = loadCartForUser<CartState>(initialUserId ?? undefined);
    return saved && isValidCartState(saved) ? saved : EMPTY_STATE;
  });

  const [cartConflict, setCartConflict] = useState<CartState | null>(null);

  // Always-current ref so the login effect never captures stale cart state.
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; });

  // Tracks previous user ID to detect login / logout transitions.
  const prevUserIdRef = useRef<number | null>(initialUserId);

  // Tracks the user ID used for the last localStorage save.
  // When this differs from the current user ID, the save effect skips —
  // the login/logout effect is responsible for that transition's save.
  const lastSavedUserIdRef = useRef<number | null>(initialUserId);

  // Login / logout handler
  useEffect(() => {
    const currId = user?.id ?? null;
    const prevId = prevUserIdRef.current;
    prevUserIdRef.current = currId;

    if (prevId === currId) return;

    if (prevId === null && currId !== null) {
      // LOGIN — decide what to do with the anonymous cart vs the user's saved cart
      const userCart = loadCartForUser<CartState>(currId);
      const committed = stateRef.current.cartItems.filter(c => !c.pendingRemove);
      const hasAnon = committed.length > 0;
      const hasSaved =
        userCart != null &&
        isValidCartState(userCart) &&
        userCart.cartItems.filter(c => !c.pendingRemove).length > 0;

      if (hasAnon && hasSaved) {
        // Both carts have items — let the user decide
        setCartConflict(userCart);
      } else if (hasSaved) {
        // No anonymous cart: load user's saved cart
        setState(userCart!);
      } else {
        // No saved cart: adopt the anonymous cart under the user's key
        saveCartForUser(stateRef.current, currId);
      }
    } else if (prevId !== null && currId === null) {
      // LOGOUT — clear in-memory cart; user's cart stays on disk for their next login
      setState(EMPTY_STATE);
    }
  }, [user?.id]);

  // Persist cart to localStorage on every state change.
  // Skips during login/logout transitions (when lastSavedUserIdRef differs from
  // current user ID) and while a conflict dialog is waiting to be resolved.
  useEffect(() => {
    const currId = user?.id ?? null;
    if (lastSavedUserIdRef.current !== currId || cartConflict !== null) {
      lastSavedUserIdRef.current = currId;
      return;
    }
    const stateToSave = {
      ...state,
      cartItems: state.cartItems.map(({ pendingRemove: _pr, ...item }) => item),
    };
    saveCartForUser(stateToSave, currId ?? undefined);
  }, [state, user?.id, cartConflict]);

  function addToCart(item: CartItem) {
    setState(prev => {
      const existing = prev.cartItems.find(c => itemsMatch(c, item));
      if (existing) {
        return {
          ...prev,
          cartItems: prev.cartItems.map(c =>
            itemsMatch(c, item) ? { ...c, quantity: c.quantity + item.quantity, pendingRemove: false } : c
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

  function removeFromCart(item: CartItem) {
    setState(prev => {
      const updated = prev.cartItems.filter(c => !itemsMatch(c, item));
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

  function replaceCart(order: Order) {
    setState({
      cartItems: orderToCartItems(order),
      restaurantId: order.restaurantId,
      restaurantName: order.restaurantName,
      comment: order.comment ?? '',
    });
  }

  function setComment(comment: string) {
    setState(prev => ({ ...prev, comment }));
  }

  function updateQuantity(item: CartItem, delta: 1 | -1) {
    setState(prev => ({
      ...prev,
      cartItems: prev.cartItems.map(c => {
        if (!itemsMatch(c, item)) return c;
        if (delta === -1 && c.quantity === 1) return { ...c, pendingRemove: true };
        return { ...c, quantity: c.quantity + delta };
      }),
    }));
  }

  function confirmRemove(item: CartItem) {
    removeFromCart(item);
  }

  function cancelRemove(item: CartItem) {
    setState(prev => ({
      ...prev,
      cartItems: prev.cartItems.map(c =>
        itemsMatch(c, item) ? { ...c, pendingRemove: false } : c
      ),
    }));
  }

  function conflictsWithCart(incomingRestaurantId: number): boolean {
    return state.cartItems.length > 0 && state.restaurantId !== incomingRestaurantId;
  }

  function resolveConflict(keep: 'saved' | 'current') {
    if (!cartConflict || !user) return;
    if (keep === 'saved') setState(cartConflict);
    setCartConflict(null);
  }

  const committedItems = state.cartItems.filter(c => !c.pendingRemove);
  const totalPrice = committedItems.reduce((sum, c) => sum + c.dish.price * c.quantity, 0);
  const totalItems = committedItems.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        confirmRemove,
        cancelRemove,
        clearCart,
        setComment,
        replaceCart,
        conflictsWithCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
      {cartConflict && (
        <CartConflictModal
          onLoadSaved={() => resolveConflict('saved')}
          onKeepCurrent={() => resolveConflict('current')}
        />
      )}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
