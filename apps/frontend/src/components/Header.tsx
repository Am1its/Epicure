import Link from 'next/link';

export default function Header() {
  return (
    <header className="epicure-header">
      <nav className="epicure-nav">
        <div className="epicure-nav__left">
          <div className="epicure-nav__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/logo.svg" alt="" aria-hidden="true" width={34} height={34} className="epicure-nav__logo-icon" />
            <span>EPICURE</span>
          </div>
          <ul className="epicure-nav__links">
            <li><Link href="/restaurants">Restaurants</Link></li>
            <li><Link href="/chefs">Chefs</Link></li>
          </ul>
        </div>

        <div className="epicure-nav__actions">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <button aria-label="Search"><img src="/icons/search.svg" alt="" aria-hidden="true" width={22} height={22} /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <button aria-label="Account"><img src="/icons/user.svg" alt="" aria-hidden="true" width={22} height={22} /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <button aria-label="Cart"><img src="/icons/cart.svg" alt="" aria-hidden="true" width={22} height={22} /></button>
        </div>
      </nav>
    </header>
  );
}
