'use client';

interface SignInModalProps {
  onClose: () => void;
}

export function SignInModal({ onClose }: SignInModalProps) {
  return (
    <>
      <button
        className="epicure-signin-backdrop"
        onClick={onClose}
        aria-label="Close sign in"
      />
      <div className="epicure-signin-modal" role="dialog" aria-label="Sign in">
        <div className="epicure-signin-modal__field">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/user.svg" alt="" aria-hidden="true" width={18} height={18} />
          <input
            type="email"
            placeholder="Email address"
            className="epicure-signin-modal__input"
          />
        </div>
        <div className="epicure-signin-modal__field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="epicure-signin-modal__input"
          />
        </div>
        <button className="epicure-signin-modal__submit">Sign In</button>
        <p className="epicure-signin-modal__register">
          Don&apos;t have an account? <a href="#">Register</a>
        </p>
      </div>
    </>
  );
}
