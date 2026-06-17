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
      <h2 className="epicure-signin-modal__title">
        {mode === 'login' ? TEXT.signIn.title : TEXT.signIn.signUpTitle}
      </h2>
      <p className="epicure-signin-modal__subtitle">{TEXT.signIn.subtitle}</p>

      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div className="epicure-signin-modal__field">
            <label htmlFor="signin-name" className="epicure-signin-modal__label">
              {TEXT.signIn.nameLabel}
            </label>
            <input
              id="signin-name"
              type="text"
              className="epicure-signin-modal__input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="epicure-signin-modal__field">
          <label htmlFor="signin-email" className="epicure-signin-modal__label">
            {TEXT.signIn.emailLabel}
          </label>
          <input
            id="signin-email"
            type="email"
            className="epicure-signin-modal__input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="epicure-signin-modal__field">
          <label htmlFor="signin-password" className="epicure-signin-modal__label">
            {TEXT.signIn.passwordLabel}
          </label>
          <input
            id="signin-password"
            type="password"
            className="epicure-signin-modal__input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="epicure-signin-modal__error">{error}</p>}

        <button
          type="submit"
          className="epicure-signin-modal__submit"
          disabled={loading}
        >
          {mode === 'login' ? TEXT.signIn.loginBtn : TEXT.signIn.signUpBtn}
        </button>
      </form>

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
  );
}
