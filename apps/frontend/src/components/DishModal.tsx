'use client';

import { useState } from 'react';
import type { Dish } from '@org/shared-types';
import { useCart } from '../context/CartContext';
import { DeleteOrderModal } from './DeleteOrderModal';
import { Modal } from './Modal';
import { ChooseSide } from './dish-modal/ChooseSide';
import { Changes } from './dish-modal/Changes';
import { QuantityStepper } from './dish-modal/QuantityStepper';
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
    <Modal
      onClose={onClose}
      ariaLabel={TEXT.dishModal.dialogAriaLabel}
      closeAriaLabel={TEXT.dishModal.closeAriaLabel}
      backdropClassName="epicure-dish-modal__backdrop"
      className="epicure-dish-modal"
    >
      {/* desktop: position:fixed so DOM position doesn't affect visual placement */}
      <button
        type="button"
        className="epicure-dish-modal__close-desktop"
        onClick={onClose}
        aria-label={TEXT.dishModal.closeAriaLabel}
      >
        <img src="/icons/x.svg" alt="" aria-hidden="true" width={20} height={20} />
      </button>
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

          <ChooseSide
            sides={dish.sides ?? []}
            dishId={dish.id}
            selectedSide={selectedSide}
            onChange={setSelectedSide}
          />

          <Changes
            changes={dish.changes ?? []}
            selectedChanges={selectedChanges}
            onToggle={toggleChange}
          />

          <QuantityStepper quantity={quantity} onChange={setQuantity} />

          <button
            type="button"
            className="epicure-dish-modal__add-btn"
            onClick={handleAddToBag}
          >
            {TEXT.dishModal.addToBag}
          </button>
        </div>
        <Footer />

      {showDeleteConfirm && (
        <DeleteOrderModal
          onConfirmDelete={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </Modal>
  );
}
