'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { Carousel } from './Carousel';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface MobileSectionProps {
  title: string;
  linkLabel?: string;
  linkHref?: string;
  children: ReactNode;
}

export function MobileSection({ title, linkLabel, linkHref, children }: MobileSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section
      ref={ref}
      className={`epicure-mobile-section${isVisible ? ' epicure-mobile-section--visible' : ''}`}
    >
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
