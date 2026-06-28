'use client';

import Link from 'next/link';
import { TEXT } from '../lib/text';
import type { NavLink } from '@org/shared-types';

interface NavDrawerProps {
  onClose: () => void;
  navLinks?: NavLink[];
  footerLinks?: NavLink[];
}

export function NavDrawer({ onClose, navLinks, footerLinks }: NavDrawerProps) {
  const resolvedNavLinks = navLinks ?? [
    { label: TEXT.shared.restaurants, url: '/restaurants' },
    { label: TEXT.shared.chefs, url: '/chefs' },
  ];
  const resolvedFooterLinks = footerLinks ?? [
    { label: TEXT.shared.contactUs, url: '/contact' },
    { label: TEXT.shared.termOfUse, url: '/terms' },
    { label: TEXT.shared.privacyPolicy, url: '/privacy' },
  ];

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
            {resolvedNavLinks.map(link => (
              <li key={link.url}>
                <Link href={link.url} onClick={onClose}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="epicure-nav-drawer__footer-links">
            {resolvedFooterLinks.map(link => (
              <li key={link.url}>
                <a href={link.url} onClick={onClose}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
