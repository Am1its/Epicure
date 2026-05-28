export default function HomePage() {
  return (
    <div>
      <header className="epicure-header">
        <nav className="epicure-nav">
          <div className="epicure-nav__left">
            <div className="epicure-nav__logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/header-logo.png" alt="" aria-hidden="true" width={34} height={34} className="epicure-nav__logo-icon" />
              <span>EPICURE</span>
            </div>
            <ul className="epicure-nav__links">
              <li><a href="/restaurants">Restaurants</a></li>
              <li><a href="/chefs">Chefs</a></li>
            </ul>
          </div>
          <div className="epicure-nav__actions">
            <button aria-label="Search">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/search.svg" alt="" aria-hidden="true" width={22} height={22} />
            </button>
            <button aria-label="Account">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/user.svg" alt="" aria-hidden="true" width={22} height={22} />
            </button>
            <button aria-label="Cart">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/cart.svg" alt="" aria-hidden="true" width={22} height={22} />
            </button>
          </div>
        </nav>
      </header>
      <main>
        <section className="epicure-hero">
          <h1 className="epicure-hero__title">Good food,<br />good mood</h1>
          <p className="epicure-hero__subtitle">Discover the finest restaurants near you</p>
          <button className="epicure-hero__cta">Explore Restaurants</button>
        </section>
        <section className="epicure-restaurants" aria-label="Restaurants" />
      </main>
      <footer className="epicure-footer">
        <nav className="epicure-footer__links" aria-label="Footer">
          <a href="/contact">Contact Us</a>
          <a href="/terms">Term of Use</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
      </footer>
    </div>
  );
}
