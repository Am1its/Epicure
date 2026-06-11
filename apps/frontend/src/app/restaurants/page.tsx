import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { RestaurantsGrid } from '../../components/RestaurantsGrid';
import { fetchApi } from '../../lib/api';
import type { Restaurant } from '@org/shared-types';
import { TEXT } from '../../lib/text';

export default async function RestaurantsPage() {
  let restaurants: Restaurant[] = [];
  try {
    restaurants = await fetchApi<Restaurant[]>('/api/restaurants');
  } catch {
    restaurants = [];
  }

  return (
    <div>
      <Header />
      <main>
        <h1 className="epicure-restaurants-page-title">{TEXT.shared.restaurants}</h1>
        <RestaurantsGrid restaurants={restaurants} />
      </main>
      <Footer />
    </div>
  );
}
