import { TEXT } from '../lib/text';

export default function Footer() {
  return (
    <footer className="epicure-footer">
      <nav className="epicure-footer__links" aria-label={TEXT.footer.navAriaLabel}>
        <a href="/contact">{TEXT.shared.contactUs}</a>
        <a href="/terms">{TEXT.shared.termOfUse}</a>
        <a href="/privacy">{TEXT.shared.privacyPolicy}</a>
      </nav>
    </footer>
  );
}
