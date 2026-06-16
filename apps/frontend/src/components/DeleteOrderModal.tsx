'use client';

import { TEXT } from '../lib/text';
import { Modal } from './Modal';

interface DeleteOrderModalProps {
  onConfirmDelete: () => void;
  onCancel: () => void;
}

export function DeleteOrderModal({ onConfirmDelete, onCancel }: DeleteOrderModalProps) {
  return (
    <Modal
      onClose={onCancel}
      ariaLabel={TEXT.deleteOrder.dialogAriaLabel}
      closeAriaLabel={TEXT.deleteOrder.cancelAriaLabel}
      backdropClassName="epicure-delete-modal__backdrop"
      className="epicure-delete-modal"
    >
      <span className="epicure-delete-modal__icon" aria-hidden="true">
        {TEXT.deleteOrder.icon}
      </span>
      <h2 className="epicure-delete-modal__title">{TEXT.deleteOrder.title}</h2>
      <p className="epicure-delete-modal__message">{TEXT.deleteOrder.message}</p>
      <button
        type="button"
        className="epicure-delete-modal__confirm"
        onClick={onConfirmDelete}
        aria-label={TEXT.deleteOrder.confirmAriaLabel}
      >
        {TEXT.deleteOrder.confirm}
      </button>
      <button
        type="button"
        className="epicure-delete-modal__cancel"
        onClick={onCancel}
        aria-label={TEXT.deleteOrder.cancelAriaLabel}
      >
        {TEXT.deleteOrder.cancel}
      </button>
    </Modal>
  );
}
