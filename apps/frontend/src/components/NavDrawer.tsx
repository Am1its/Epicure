'use client';

import Link from 'next/link';
import { TEXT } from '../lib/text';

interface NavDrawerProps {
  onClose: () => void;
}

export function NavDrawer({ onClose }: NavDrawerProps) {
  return (
    <>
      <div
        className="epicure-nav-drawer__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="epicure-nav-drawer" role="dialog" aria-label={TEXT.navDrawer.dialogAriaLabel}>
        <button
          className="epicure-nav-drawer__close"
          onClick={onClose}
          aria-label={TEXT.navDrawer.closeAriaLabel}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="19.3" y1="4.7" x2="4.7" y2="19.3" />
            <line x1="4.7" y1="4.7" x2="19.3" y2="19.3" />
          </svg>
        </button>
        <nav>
          <ul className="epicure-nav-drawer__main-links">
            <li><Link href="/restaurants">{TEXT.shared.restaurants}</Link></li>
            <li><Link href="/chefs">{TEXT.shared.chefs}</Link></li>
          </ul>
          <ul className="epicure-nav-drawer__footer-links">
            <li><a href="#">{TEXT.shared.contactUs}</a></li>
            <li><a href="#">{TEXT.shared.termOfUse}</a></li>
            <li><a href="#">{TEXT.shared.privacyPolicy}</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
}
