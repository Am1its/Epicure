import Link from 'next/link';
import { type ReactNode } from 'react';
import { Carousel } from './Carousel';

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
      <Carousel className="epicure-mobile-section__row">{children}</Carousel>
      {linkLabel && linkHref && (
        <Link href={linkHref} className="epicure-mobile-section__link">
          {linkLabel}
          <img src="/icons/Arrow.svg" alt="" aria-hidden="true" width={24} height={24} />
        </Link>
      )}
    </section>
  );
}
