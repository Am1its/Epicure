import type { ReactNode } from 'react';
import Link from 'next/link';
import { TEXT } from '../../lib/text';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="epicure-checkout-layout">
      <header className="epicure-checkout-header">
        <Link href="/" className="epicure-checkout-header__logo-link">
          <img src="/icons/logo.svg" alt="" aria-hidden="true" width={34} height={34} className="epicure-checkout-header__logo" />
          <span className="epicure-checkout-header__brand">{TEXT.nav.brandName}</span>
        </Link>
        <span className="epicure-checkout-header__title">{TEXT.checkout.pageTitle}</span>
      </header>
      {children}
    </div>
  );
}
