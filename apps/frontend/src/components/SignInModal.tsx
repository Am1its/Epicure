'use client';

import { TEXT } from '../lib/text';

interface SignInModalProps {
  onClose: () => void;
}

export function SignInModal({ onClose }: SignInModalProps) {
  return (
    <>
      <button
        className="epicure-signin-backdrop"
        onClick={onClose}
        aria-label={TEXT.signIn.closeAriaLabel}
      />
      <div className="epicure-signin-modal" role="dialog" aria-label={TEXT.signIn.dialogAriaLabel}>
        <button
          className="epicure-signin-modal__close"
          onClick={onClose}
          aria-label={TEXT.signIn.closePanelAriaLabel}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="19.3" y1="4.7" x2="4.7" y2="19.3" />
            <line x1="4.7" y1="4.7" x2="19.3" y2="19.3" />
          </svg>
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
        <a href="#" className="epicure-signin-modal__forgot">{TEXT.signIn.forgotPassword}</a>
        <div className="epicure-signin-modal__divider"><span>{TEXT.signIn.divider}</span></div>
        <button className="epicure-signin-modal__signup">{TEXT.signIn.signUpBtn}</button>
      </div>
    </>
  );
}
