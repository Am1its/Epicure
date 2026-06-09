import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RestaurantsGrid } from '../../components/RestaurantsGrid';
import { TEXT } from '../../lib/text';

export default function RestaurantsPage() {
  return (
    <div>
      <Header />
      <main>
        <h1 className="epicure-restaurants-page-title">{TEXT.shared.restaurants}</h1>
        <RestaurantsGrid />
      </main>
      <Footer />
    </div>
  );
}
