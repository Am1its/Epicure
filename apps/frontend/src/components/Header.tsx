'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavDrawer } from './NavDrawer';
import { SearchOverlay } from './SearchOverlay';
import { CartPanel } from './CartPanel';
import { SignInModal } from './SignInModal';

type ActivePanel = 'none' | 'drawer' | 'search' | 'cart' | 'signin';

export default function Header() {
  const [activePanel, setActivePanel] = useState<ActivePanel>('none');

  function toggle(panel: Exclude<ActivePanel, 'none'>) {
    setActivePanel(prev => (prev === panel ? 'none' : panel));
  }

  return (
    <>
      <header className="epicure-header">
        <nav className="epicure-nav">
          {/* Mobile: hamburger left */}
          <button
            className="epicure-nav__hamburger"
            aria-label="Open navigation"
            onClick={() => toggle('drawer')}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
              <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Desktop: left side (logo + links) */}
          <div className="epicure-nav__left">
            <div className="epicure-nav__logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/logo.svg" alt="" aria-hidden="true" width={34} height={34} className="epicure-nav__logo-icon" />
              <span>EPICURE</span>
            </div>
            <ul className="epicure-nav__links">
              <li><Link href="/restaurants">Restaurants</Link></li>
              <li><Link href="/chefs">Chefs</Link></li>
            </ul>
          </div>

          {/* Action icons — both mobile and desktop */}
          <div className="epicure-nav__actions">
            <button aria-label="Search" onClick={() => toggle('search')}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/search.svg" alt="" aria-hidden="true" width={22} height={22} />
            </button>
            <button aria-label="Account" onClick={() => toggle('signin')}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/user.svg" alt="" aria-hidden="true" width={22} height={22} />
            </button>
            <button aria-label="Cart" onClick={() => toggle('cart')}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/cart.svg" alt="" aria-hidden="true" width={22} height={22} />
            </button>
          </div>
        </nav>
      </header>

      {activePanel === 'drawer' && <NavDrawer onClose={() => setActivePanel('none')} />}
      {activePanel === 'search' && <SearchOverlay onClose={() => setActivePanel('none')} />}
      {activePanel === 'cart' && <CartPanel onClose={() => setActivePanel('none')} />}
      {activePanel === 'signin' && <SignInModal onClose={() => setActivePanel('none')} />}
    </>
  );
}
