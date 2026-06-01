'use client';

interface NavDrawerProps {
  onClose: () => void;
}

export function NavDrawer({ onClose }: NavDrawerProps) {
  return (
    <div className="epicure-nav-drawer" role="dialog" aria-label="Navigation menu">
      <button
        className="epicure-nav-drawer__close"
        onClick={onClose}
        aria-label="Close navigation"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <line x1="19.3" y1="4.7" x2="4.7" y2="19.3" />
          <line x1="4.7" y1="4.7" x2="19.3" y2="19.3" />
        </svg>
      </button>
      <nav>
        <ul className="epicure-nav-drawer__main-links">
          <li><a href="/restaurants">Restaurants</a></li>
          <li><a href="/chefs">Chefs</a></li>
        </ul>
        <ul className="epicure-nav-drawer__footer-links">
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Term of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </nav>
    </div>
  );
}
