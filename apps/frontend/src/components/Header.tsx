'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavDrawer } from './NavDrawer';
import { SearchOverlay } from './SearchOverlay';
import { CartPanel } from './CartPanel';
import { SignInModal } from './SignInModal';
import { UserDropdown } from './UserDropdown';
import { TEXT } from '../lib/text';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

type ActivePanel = 'none' | 'drawer' | 'search' | 'cart' | 'signin' | 'userdropdown';

export default function Header() {
  const [activePanel, setActivePanel] = useState<ActivePanel>('none');
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { user } = useAuth();
  const userButtonRef = useRef<HTMLButtonElement>(null);

  function toggle(panel: Exclude<ActivePanel, 'none'>) {
    setActivePanel(prev => {
      if (prev === panel) { setSearchQuery(''); return 'none'; }
      return panel;
    });
  }

  function handleUserIconClick() {
    toggle(user ? 'userdropdown' : 'signin');
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
            <img src="/icons/logo.svg" alt="" aria-hidden="true" width={34} height={34} className="epicure-nav__logo-icon" />
            <span>{TEXT.nav.brandName}</span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <ul className="epicure-nav__links">
            <li>
              <Link
                href="/restaurants"
                className={pathname.startsWith('/restaurants') ? 'epicure-nav__link--active' : ''}
                onClick={(e) => {
                  if (pathname.startsWith('/restaurants')) {
                    e.preventDefault();
                    window.location.href = '/restaurants';
                  }
                }}
              >
                {TEXT.shared.restaurants}
              </Link>
            </li>
            <li>
              <Link
                href="/chefs"
                className={pathname.startsWith('/chefs') ? 'epicure-nav__link--active' : ''}
                onClick={(e) => {
                  if (pathname.startsWith('/chefs')) {
                    e.preventDefault();
                    window.location.href = '/chefs';
                  }
                }}
              >
                {TEXT.shared.chefs}
              </Link>
            </li>
          </ul>

          {/* Action icons */}
          <div className="epicure-nav__actions">
            {/* Desktop inline search — appears to the left of the search icon */}
            {activePanel === 'search' && (
              <div className="epicure-nav__search-inline">
                <input
                  type="text"
                  placeholder={TEXT.searchOverlay.placeholder}
                  className="epicure-nav__search-input"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    className="epicure-nav__search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label={TEXT.home.searchClearAriaLabel}
                  >
                    <img src="/icons/x.svg" alt="" aria-hidden="true" width={12} height={12} />
                  </button>
                )}
              </div>
            )}

            <button aria-label={TEXT.nav.searchAriaLabel} onClick={() => toggle('search')}>
              <img src="/icons/search.svg" alt="" aria-hidden="true" width={22} height={22} />
            </button>

            <button ref={userButtonRef} aria-label={TEXT.nav.accountAriaLabel} onClick={handleUserIconClick}>
              <span className="epicure-nav__user-wrap">
                <img src="/icons/user.svg" alt="" aria-hidden="true" width={22} height={22} />
                {user && <span className="epicure-nav__user-dot" aria-hidden="true" />}
              </span>
            </button>

            <button aria-label={TEXT.nav.cartAriaLabel} onClick={() => toggle('cart')}>
              <span className="epicure-nav__cart-wrap">
                <img src="/icons/cart.svg" alt="" aria-hidden="true" width={22} height={22} />
                {totalItems > 0 && (
                  <span className="epicure-nav__cart-badge" aria-label={`${totalItems} items in cart`}>
                    {totalItems}
                  </span>
                )}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {activePanel === 'drawer' && <NavDrawer onClose={() => setActivePanel('none')} />}
      {activePanel === 'search' && <SearchOverlay onClose={() => setActivePanel('none')} />}
      {activePanel === 'cart' && <CartPanel onClose={() => setActivePanel('none')} />}
      {activePanel === 'signin' && <SignInModal onClose={() => setActivePanel('none')} />}
      {activePanel === 'userdropdown' && <UserDropdown onClose={() => setActivePanel('none')} triggerRef={userButtonRef} />}
    </>
  );
}
