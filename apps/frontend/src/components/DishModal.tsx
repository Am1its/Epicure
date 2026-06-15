'use client';

import { useState } from 'react';
import type { Dish } from '@org/shared-types';
import { useCart } from '../context/CartContext';
import { DeleteOrderModal } from './DeleteOrderModal';
import { TEXT } from '../lib/text';
import Footer from './Footer';

const TYPE_ICONS: Record<string, string> = {
  Spicy: '/icons/spicy.svg',
  Vegan: '/icons/vegan.svg',
  Vegetarian: '/icons/vegetarian.svg',
};

interface DishModalProps {
  dish: Dish;
  imageUrl: string;
  restaurantId: number;
  restaurantName: string;
  onClose: () => void;
}

export function DishModal({ dish, imageUrl, restaurantId, restaurantName, onClose }: DishModalProps) {
  const { addToCart, conflictsWithCart, clearCart } = useCart();
  const [selectedSide, setSelectedSide] = useState<string | undefined>(undefined);
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function toggleChange(change: string) {
    setSelectedChanges(prev =>
      prev.includes(change) ? prev.filter(c => c !== change) : [...prev, change]
    );
  }

  function doAddToCart() {
    addToCart({ dish, imageUrl, quantity, selectedSide, selectedChanges, restaurantId, restaurantName });
    onClose();
  }

  function handleAddToBag() {
    if (conflictsWithCart(restaurantId)) {
      setShowDeleteConfirm(true);
      return;
    }
    doAddToCart();
  }

  function handleConfirmDelete() {
    clearCart();
    doAddToCart();
  }

  return (
    <>
      <button
        type="button"
        className="epicure-dish-modal__backdrop"
        onClick={onClose}
        aria-label={TEXT.dishModal.closeAriaLabel}
      />
      {/* desktop: floats in backdrop above modal */}
      <button
        type="button"
        className="epicure-dish-modal__close-desktop"
        onClick={onClose}
        aria-label={TEXT.dishModal.closeAriaLabel}
      >
        <img src="/icons/x.svg" alt="" aria-hidden="true" width={20} height={20} />
      </button>

      <div className="epicure-dish-modal" role="dialog" aria-modal="true" aria-label={TEXT.dishModal.dialogAriaLabel}>
        {/* mobile: in-flow above image */}
        <button
          type="button"
          className="epicure-dish-modal__close-mobile"
          onClick={onClose}
          aria-label={TEXT.dishModal.closeAriaLabel}
        >
          <img src="/icons/x.svg" alt="" aria-hidden="true" width={18} height={18} />
        </button>
        <img src={imageUrl} alt={dish.name} className="epicure-dish-modal__image" />

        <div className="epicure-dish-modal__body">
          <div className="epicure-dish-modal__name-row">
            {/* mobile: icon sits beside name in the name row */}
            {dish.type && TYPE_ICONS[dish.type] && (
              <img
                src={TYPE_ICONS[dish.type]}
                alt={dish.type}
                className="epicure-dish-modal__type-icon epicure-dish-modal__type-icon--mobile"
              />
            )}
            <h2 className="epicure-dish-modal__name">{dish.name}</h2>
          </div>
          {dish.description && (
            <p className="epicure-dish-modal__description">{dish.description}</p>
          )}
          {/* desktop: icon sits below description — different structural position requires two DOM nodes */}
          {dish.type && TYPE_ICONS[dish.type] && (
            <img
              src={TYPE_ICONS[dish.type]}
              alt={dish.type}
              className="epicure-dish-modal__type-icon epicure-dish-modal__type-icon--desktop"
            />
          )}
          <div className="epicure-dish-modal__price-row">
            <span className="epicure-dish-modal__line" />
            <img src="/icons/Shekel.svg" alt="₪" aria-hidden="true" className="epicure-dish-modal__shekel" />
            <span className="epicure-dish-modal__price">{dish.price}</span>
            <span className="epicure-dish-modal__line" />
          </div>

          {dish.sides && dish.sides.length > 0 && (
            <div className="epicure-dish-modal__section">
              <h3 className="epicure-dish-modal__section-title">{TEXT.dishModal.chooseSide}</h3>
              {dish.sides.map(side => (
                <label key={side} className="epicure-dish-modal__option">
                  <input
                    type="radio"
                    name={`side-${dish.id}`}
                    value={side}
                    checked={selectedSide === side}
                    onChange={() => setSelectedSide(side)}
                  />
                  {side}
                </label>
              ))}
            </div>
          )}

          {dish.changes && dish.changes.length > 0 && (
            <div className="epicure-dish-modal__section">
              <h3 className="epicure-dish-modal__section-title">{TEXT.dishModal.changes}</h3>
              {dish.changes.map(change => (
                <label key={change} className="epicure-dish-modal__option">
                  <input
                    type="checkbox"
                    checked={selectedChanges.includes(change)}
                    onChange={() => toggleChange(change)}
                  />
                  {change}
                </label>
              ))}
            </div>
          )}

          <div className="epicure-dish-modal__section">
            <h3 className="epicure-dish-modal__section-title">{TEXT.dishModal.quantity}</h3>
            <div className="epicure-dish-modal__quantity">
              <button
                type="button"
                className="epicure-dish-modal__qty-btn"
                aria-label={TEXT.dishModal.decreaseAriaLabel}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                —
              </button>
              <span className="epicure-dish-modal__qty-value">{quantity}</span>
              <button
                type="button"
                className="epicure-dish-modal__qty-btn"
                aria-label={TEXT.dishModal.increaseAriaLabel}
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="epicure-dish-modal__add-btn"
            onClick={handleAddToBag}
          >
            {TEXT.dishModal.addToBag}
          </button>
        </div>
        <Footer />
      </div>

      {showDeleteConfirm && (
        <DeleteOrderModal
          onConfirmDelete={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}
