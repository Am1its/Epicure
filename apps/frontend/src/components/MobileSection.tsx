import Link from 'next/link';
import { type ReactNode } from 'react';

interface MobileSectionProps {
  title: string;
  linkLabel?: string;
  linkHref?: string;
  children: ReactNode;
}

export function MobileSection({ title, linkLabel, linkHref, children }: MobileSectionProps) {
  return (
    <section className="epicure-mobile-section">
      <h2 className="epicure-mobile-section__title">{title}</h2>
      <div className="epicure-mobile-section__row">{children}</div>
      {linkLabel && linkHref && (
        <Link href={linkHref} className="epicure-mobile-section__link">
          {linkLabel} <span aria-hidden="true">&raquo;&raquo;</span>
        </Link>
      )}
    </section>
  );
}
