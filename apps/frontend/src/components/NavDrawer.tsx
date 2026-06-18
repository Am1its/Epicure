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
          <img src="/icons/x.svg" alt="" aria-hidden="true" width={24} height={24} />
        </button>
        <nav>
          <ul className="epicure-nav-drawer__main-links">
            <li><Link href="/restaurants" onClick={onClose}>{TEXT.shared.restaurants}</Link></li>
            <li><Link href="/chefs" onClick={onClose}>{TEXT.shared.chefs}</Link></li>
          </ul>
          <ul className="epicure-nav-drawer__footer-links">
            <li><a href="#" aria-disabled="true" onClick={e => e.preventDefault()}>{TEXT.shared.contactUs}</a></li>
            <li><a href="#" aria-disabled="true" onClick={e => e.preventDefault()}>{TEXT.shared.termOfUse}</a></li>
            <li><a href="#" aria-disabled="true" onClick={e => e.preventDefault()}>{TEXT.shared.privacyPolicy}</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
}
