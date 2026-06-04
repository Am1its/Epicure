'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavDrawer } from './NavDrawer';
import { SearchOverlay } from './SearchOverlay';
import { CartPanel } from './CartPanel';
import { SignInModal } from './SignInModal';
import { TEXT } from '../lib/text';

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
            aria-label={TEXT.nav.openNavAriaLabel}
            onClick={() => toggle('drawer')}
          >
            <img src="/icons/Hamburger.svg" alt="" aria-hidden="true" width={22} height={16} />
          </button>

          {/* Logo — centered on mobile, left on desktop */}
          <Link href="/" className="epicure-nav__logo" aria-label={TEXT.nav.logoAriaLabel}>
            { }
            <img src="/icons/logo.svg" alt="" aria-hidden="true" width={34} height={34} className="epicure-nav__logo-icon" />
            <span>{TEXT.nav.brandName}</span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <ul className="epicure-nav__links">
            <li><Link href="/restaurants">{TEXT.shared.restaurants}</Link></li>
            <li><Link href="/chefs">{TEXT.shared.chefs}</Link></li>
          </ul>

          {/* Action icons — both mobile and desktop */}
          <div className="epicure-nav__actions">
            <button aria-label={TEXT.nav.searchAriaLabel} onClick={() => toggle('search')}>
              { }
              <img src="/icons/search.svg" alt="" aria-hidden="true" width={22} height={22} />
            </button>
            <button aria-label={TEXT.nav.accountAriaLabel} onClick={() => toggle('signin')}>
              { }
              <img src="/icons/user.svg" alt="" aria-hidden="true" width={22} height={22} />
            </button>
            <button aria-label={TEXT.nav.cartAriaLabel} onClick={() => toggle('cart')}>
              { }
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
