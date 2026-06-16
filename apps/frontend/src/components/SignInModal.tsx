'use client';

import { TEXT } from '../lib/text';
import { Modal } from './Modal';

interface SignInModalProps {
  onClose: () => void;
}

export function SignInModal({ onClose }: SignInModalProps) {
  return (
    <Modal
      onClose={onClose}
      ariaLabel={TEXT.signIn.dialogAriaLabel}
      closeAriaLabel={TEXT.signIn.closeAriaLabel}
      backdropClassName="epicure-signin-backdrop"
      className="epicure-signin-modal"
    >
        <button
          className="epicure-signin-modal__close"
          onClick={onClose}
          aria-label={TEXT.signIn.closePanelAriaLabel}
        >
          <img src="/icons/x.svg" alt="" aria-hidden="true" width={20} height={20} />
        </button>
        <h2 className="epicure-signin-modal__title">{TEXT.signIn.title}</h2>
        <p className="epicure-signin-modal__subtitle">{TEXT.signIn.subtitle}</p>
        <div className="epicure-signin-modal__field">
          <label htmlFor="signin-email" className="epicure-signin-modal__label">{TEXT.signIn.emailLabel}</label>
          <input
            id="signin-email"
            type="email"
            placeholder=""
            className="epicure-signin-modal__input"
          />
        </div>
        <div className="epicure-signin-modal__field">
          <label htmlFor="signin-password" className="epicure-signin-modal__label">{TEXT.signIn.passwordLabel}</label>
          <input
            id="signin-password"
            type="password"
            placeholder=""
            className="epicure-signin-modal__input"
          />
        </div>
        <button className="epicure-signin-modal__submit">{TEXT.signIn.loginBtn}</button>
        <a href="#" aria-disabled="true" onClick={e => e.preventDefault()} className="epicure-signin-modal__forgot">{TEXT.signIn.forgotPassword}</a>
        <div className="epicure-signin-modal__divider"><span>{TEXT.signIn.divider}</span></div>
        <button className="epicure-signin-modal__signup">{TEXT.signIn.signUpBtn}</button>
    </Modal>
  );
}
