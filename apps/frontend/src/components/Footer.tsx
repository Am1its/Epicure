import type { NavLink } from '@org/shared-types';
import { TEXT } from '../lib/text';

interface FooterProps {
  footerLinks?: NavLink[];
}

export default function Footer({ footerLinks }: FooterProps) {
  const resolvedLinks = footerLinks ?? [
    { label: TEXT.shared.contactUs, url: '/contact' },
    { label: TEXT.shared.termOfUse, url: '/terms' },
    { label: TEXT.shared.privacyPolicy, url: '/privacy' },
  ];

  return (
    <footer className="epicure-footer">
      <nav className="epicure-footer__links" aria-label={TEXT.footer.navAriaLabel}>
        {resolvedLinks.map(link => (
          <a key={`${link.url}-${link.label}`} href={link.url}>{link.label}</a>
        ))}
      </nav>
    </footer>
  );
}
