import { type ReactNode } from 'react';

interface CarouselProps {
  className: string;
  children: ReactNode;
}

export function Carousel({ className, children }: CarouselProps) {
  return <div className={className}>{children}</div>;
}
