import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <section className="epicure-hero">
          <h1 className="epicure-hero__title">Good food,<br />good mood</h1>
          <p className="epicure-hero__subtitle">Discover the finest restaurants near you</p>
          <button className="epicure-hero__cta">Explore Restaurants</button>
        </section>
        <section className="epicure-restaurants" aria-label="Restaurants" />
      </main>
      <Footer />
    </div>
  );
}
