'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TEXT } from '../lib/text';
import { Modal } from './Modal';

interface SignUpModalProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

export function SignUpModal({ onClose, onSwitchToSignIn }: SignUpModalProps) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Matches RegisterDto's @MinLength(6) on the backend — without this, the button
  // enables for short passwords that the backend then rejects with an opaque 400.
  const isActive = name.length > 0 && email.length > 0 && password.length >= 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : TEXT.signIn.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  function safeClose() {
    if (!loading) onClose();
  }

  return (
    <>
      <button
        className="epicure-signin-modal__close-desktop"
        onClick={safeClose}
        aria-label={TEXT.signUp.closePanelAriaLabel}
      >
        <img src="/icons/x.svg" alt="" aria-hidden="true" width={20} height={20} />
      </button>

      <Modal
        onClose={safeClose}
        ariaLabel={TEXT.signUp.dialogAriaLabel}
        closeAriaLabel={TEXT.signUp.closeAriaLabel}
        backdropClassName="epicure-signin-backdrop"
        className="epicure-signin-modal"
      >
        <button
          className="epicure-signin-modal__close-mobile"
          onClick={safeClose}
          aria-label={TEXT.signUp.closePanelAriaLabel}
        >
          <img src="/icons/x.svg" alt="" aria-hidden="true" width={20} height={20} />
        </button>

        <div className="epicure-signin-modal__content">
          <h2 className="epicure-signin-modal__title">{TEXT.signIn.signUpTitle}</h2>
          <p className="epicure-signin-modal__subtitle">{TEXT.signIn.subtitle}</p>

          <form onSubmit={handleSubmit}>
            <div className="epicure-signin-modal__field">
              <input
                id="signup-name"
                type="text"
                className="epicure-signin-modal__input"
                placeholder=" "
                aria-label={TEXT.signIn.nameLabel}
                value={name}
                onChange={e => { setName(e.target.value); setError(''); }}
                required
              />
              <label className="epicure-signin-modal__label" htmlFor="signup-name">{TEXT.signIn.nameLabel}</label>
            </div>
            <div className="epicure-signin-modal__field">
              <input
                id="signup-email"
                type="email"
                className="epicure-signin-modal__input"
                placeholder=" "
                aria-label={TEXT.signIn.emailLabel}
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                required
              />
              <label className="epicure-signin-modal__label" htmlFor="signup-email">{TEXT.signIn.emailLabel}</label>
            </div>
            <div className="epicure-signin-modal__field">
              <input
                id="signup-password"
                type="password"
                className="epicure-signin-modal__input"
                placeholder=" "
                aria-label={TEXT.signIn.passwordLabel}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                required
              />
              <label className="epicure-signin-modal__label" htmlFor="signup-password">{TEXT.signIn.passwordLabel}</label>
            </div>

            <p className="epicure-signin-modal__error" aria-live="polite">{error}</p>

            <button
              type="submit"
              className={`epicure-signin-modal__submit${isActive ? ' epicure-signin-modal__submit--active' : ''}`}
              disabled={loading}
            >
              {TEXT.signIn.signUpBtn}
            </button>
          </form>
        </div>

        <button
          type="button"
          className="epicure-signin-modal__forgot"
          onClick={onSwitchToSignIn}
          disabled={loading}
        >
          {TEXT.signIn.backToLogin}
        </button>
      </Modal>
    </>
  );
}
