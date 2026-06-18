'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavDrawer } from './NavDrawer';
import { SearchOverlay } from './SearchOverlay';
import { CartPanel } from './CartPanel';
import { SignInModal } from './SignInModal';
import { SignUpModal } from './SignUpModal';
import { UserDropdown } from './UserDropdown';
import { TEXT } from '../lib/text';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../hooks/useSearch';
import { useClickOutside } from '../hooks/useClickOutside';
import type { NavLink } from '@org/shared-types';
import { strapiImageUrl } from '../lib/api';

type ActivePanel = 'none' | 'drawer' | 'search' | 'cart' | 'signin' | 'signup' | 'userdropdown';

interface HeaderProps {
  brandName?: string;
  logoUrl?: string | null;
  navLinks?: NavLink[];
}

export default function Header({ brandName, logoUrl, navLinks }: HeaderProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>('none');
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { user } = useAuth();
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchInlineRef = useRef<HTMLDivElement>(null);
  const searchResults = useSearch(searchQuery);
  const hasSearchResults = searchResults.restaurants.length > 0 || searchResults.chefs.length > 0 || searchResults.cuisines.length > 0;
  const resolvedNavLinks = navLinks ?? [
    { label: TEXT.shared.restaurants, url: '/restaurants' },
    { label: TEXT.shared.chefs, url: '/chefs' },
  ];

  useClickOutside(
    searchInlineRef,
    () => {
      if (!searchInlineRef.current?.offsetParent) return;
      setSearchQuery('');
      setActivePanel('none');
    },
    activePanel === 'search',
    searchButtonRef,
  );

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
            <img
              src={logoUrl ? strapiImageUrl(logoUrl) : '/icons/logo.svg'}
              alt=""
              aria-hidden="true"
              width={34}
              height={34}
              className="epicure-nav__logo-icon"
            />
            <span>{brandName ?? TEXT.nav.brandName}</span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <ul className="epicure-nav__links">
            {resolvedNavLinks.map(link => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className={(link.url === '/' ? pathname === '/' : pathname.startsWith(link.url)) ? 'epicure-nav__link--active' : ''}
                  onClick={(e) => {
                    if (link.url === '/' ? pathname === '/' : pathname.startsWith(link.url)) {
                      e.preventDefault();
                      window.location.href = link.url;
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action icons */}
          <div className="epicure-nav__actions">
            {/* Desktop inline search — appears to the left of the search icon */}
            {activePanel === 'search' && (
              <div className="epicure-nav__search-inline" ref={searchInlineRef}>
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
                {searchQuery && hasSearchResults && (
                  <div className="epicure-nav__search-results">
                    {searchResults.restaurants.length > 0 && (
                      <div className="epicure-nav__search-group">
                        <span className="epicure-nav__search-label">{TEXT.home.searchResultsRestaurants}</span>
                        {searchResults.restaurants.map(r => (
                          <Link
                            key={r.id}
                            href={`/restaurants/${r.id}`}
                            className="epicure-nav__search-item"
                            onClick={() => { setSearchQuery(''); setActivePanel('none'); }}
                          >
                            {r.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchResults.chefs.length > 0 && (
                      <div className="epicure-nav__search-group">
                        <span className="epicure-nav__search-label">{TEXT.home.searchResultsChefs}</span>
                        {searchResults.chefs.map(c => (
                          <Link
                            key={c.id}
                            href={`/chefs?highlight=${c.id}`}
                            className="epicure-nav__search-item"
                            onClick={() => { setSearchQuery(''); setActivePanel('none'); }}
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchResults.cuisines.length > 0 && (
                      <div className="epicure-nav__search-group">
                        <span className="epicure-nav__search-label">{TEXT.home.searchResultsCuisines}</span>
                        {searchResults.cuisines.map(c => (
                          <Link
                            key={c.label}
                            href="/restaurants"
                            className="epicure-nav__search-item"
                            onClick={() => { sessionStorage.setItem('epicure_pending_cuisine_filter', JSON.stringify([c.label])); setSearchQuery(''); setActivePanel('none'); }}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <button ref={searchButtonRef} aria-label={TEXT.nav.searchAriaLabel} onClick={() => toggle('search')}>
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
      {activePanel === 'signin' && (
        <SignInModal
          onClose={() => setActivePanel('none')}
          onSwitchToSignUp={() => setActivePanel('signup')}
        />
      )}
      {activePanel === 'signup' && (
        <SignUpModal
          onClose={() => setActivePanel('none')}
          onSwitchToSignIn={() => setActivePanel('signin')}
        />
      )}
      {activePanel === 'userdropdown' && <UserDropdown onClose={() => setActivePanel('none')} triggerRef={userButtonRef} />}
    </>
  );
}
