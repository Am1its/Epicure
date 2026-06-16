'use client';

import { type ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  ariaLabel: string;
  closeAriaLabel: string;
  backdropClassName: string;
  className: string;
  children: ReactNode;
}

export function Modal({ onClose, ariaLabel, closeAriaLabel, backdropClassName, className, children }: ModalProps) {
  return (
    <>
      <button type="button" className={backdropClassName} onClick={onClose} aria-label={closeAriaLabel} />
      <div className={className} role="dialog" aria-modal="true" aria-label={ariaLabel}>
        {children}
      </div>
    </>
  );
}
