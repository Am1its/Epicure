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
        <button
          className="epicure-signin-modal__close"
          onClick={onClose}
          aria-label="Close sign in panel"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="19.3" y1="4.7" x2="4.7" y2="19.3" />
            <line x1="4.7" y1="4.7" x2="19.3" y2="19.3" />
          </svg>
        </button>
        <h2 className="epicure-signin-modal__title">SIGN IN</h2>
        <p className="epicure-signin-modal__subtitle">To continue the order, please sign in</p>
        <div className="epicure-signin-modal__field">
          <label htmlFor="signin-email" className="epicure-signin-modal__label">Email address</label>
          <input
            id="signin-email"
            type="email"
            placeholder=""
            className="epicure-signin-modal__input"
          />
        </div>
        <div className="epicure-signin-modal__field">
          <label htmlFor="signin-password" className="epicure-signin-modal__label">Password</label>
          <input
            id="signin-password"
            type="password"
            placeholder=""
            className="epicure-signin-modal__input"
          />
        </div>
        <button className="epicure-signin-modal__submit">LOGIN</button>
        <a href="#" className="epicure-signin-modal__forgot">Forget password?</a>
        <div className="epicure-signin-modal__divider"><span>or</span></div>
        <button className="epicure-signin-modal__signup">SIGN UP</button>
      </div>
    </>
  );
}
