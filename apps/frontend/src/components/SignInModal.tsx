'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TEXT } from '../lib/text';
import { Modal } from './Modal';

interface SignInModalProps {
  onClose: () => void;
}

type Mode = 'login' | 'register';

export function SignInModal({ onClose }: SignInModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isActive = mode === 'login'
    ? email.length > 0 && password.length > 0
    : name.length > 0 && email.length > 0 && password.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : TEXT.signIn.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  function switchMode(next: Mode) {
    setMode(next);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      {/* Desktop: X outside modal — transform on modal clips fixed children */}
      <button
        className="epicure-signin-modal__close-desktop"
        onClick={onClose}
        aria-label={TEXT.signIn.closePanelAriaLabel}
      >
        <img src="/icons/x.svg" alt="" aria-hidden="true" width={20} height={20} />
      </button>

      <Modal
        onClose={onClose}
        ariaLabel={TEXT.signIn.dialogAriaLabel}
        closeAriaLabel={TEXT.signIn.closeAriaLabel}
        backdropClassName="epicure-signin-backdrop"
        className="epicure-signin-modal"
      >
        {/* Mobile: X inside modal */}
        <button
          className="epicure-signin-modal__close-mobile"
          onClick={onClose}
          aria-label={TEXT.signIn.closePanelAriaLabel}
        >
          <img src="/icons/x.svg" alt="" aria-hidden="true" width={20} height={20} />
        </button>

        <div className="epicure-signin-modal__content">
          <h2 className="epicure-signin-modal__title">
            {mode === 'login' ? TEXT.signIn.title : TEXT.signIn.signUpTitle}
          </h2>
          <p className="epicure-signin-modal__subtitle">{TEXT.signIn.subtitle}</p>

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="epicure-signin-modal__field">
                <input
                  id="signin-name"
                  type="text"
                  className="epicure-signin-modal__input"
                  placeholder=" "
                  aria-label={TEXT.signIn.nameLabel}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <label className="epicure-signin-modal__label" htmlFor="signin-name">{TEXT.signIn.nameLabel}</label>
              </div>
            )}
            <div className="epicure-signin-modal__field">
              <input
                id="signin-email"
                type="email"
                className="epicure-signin-modal__input"
                placeholder=" "
                aria-label={TEXT.signIn.emailLabel}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <label className="epicure-signin-modal__label" htmlFor="signin-email">{TEXT.signIn.emailLabel}</label>
            </div>
            <div className="epicure-signin-modal__field">
              <input
                id="signin-password"
                type="password"
                className="epicure-signin-modal__input"
                placeholder=" "
                aria-label={TEXT.signIn.passwordLabel}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label className="epicure-signin-modal__label" htmlFor="signin-password">{TEXT.signIn.passwordLabel}</label>
            </div>

            {error && <p className="epicure-signin-modal__error">{error}</p>}

            <button
              type="submit"
              className={`epicure-signin-modal__submit${isActive ? ' epicure-signin-modal__submit--active' : ''}`}
              disabled={loading}
            >
              {mode === 'login' ? TEXT.signIn.loginBtn : TEXT.signIn.signUpBtn}
            </button>
          </form>
        </div>

        {mode === 'login' && (
          <>
            <a
              href="#"
              aria-disabled="true"
              onClick={e => e.preventDefault()}
              className="epicure-signin-modal__forgot"
            >
              {TEXT.signIn.forgotPassword}
            </a>
            <div className="epicure-signin-modal__divider">
              <span>{TEXT.signIn.divider}</span>
            </div>
            <button
              type="button"
              className="epicure-signin-modal__signup"
              onClick={() => switchMode('register')}
            >
              {TEXT.signIn.signUpBtn}
            </button>
          </>
        )}

        {mode === 'register' && (
          <button
            type="button"
            className="epicure-signin-modal__forgot"
            onClick={() => switchMode('login')}
          >
            {TEXT.signIn.backToLogin}
          </button>
        )}
      </Modal>
    </>
  );
}
