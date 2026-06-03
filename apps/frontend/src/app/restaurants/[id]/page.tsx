import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { DishGrid } from '../../../components/DishGrid';
import { fetchApi, strapiImageUrl } from '../../../lib/api';
import type { Restaurant } from '@org/shared-types';
import { TEXT } from '../../../lib/text';

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let restaurant: Restaurant | null = null;
  try {
    restaurant = await fetchApi<Restaurant>(`/api/restaurants/${id}`);
  } catch {
    restaurant = null;
  }

  if (!restaurant) {
    return (
      <div>
        <Header />
        <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <p>{TEXT.restaurantDetail.notFound}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={strapiImageUrl(restaurant.image?.url)}
          alt={restaurant.name}
          className="epicure-detail-hero"
        />
        <div className="epicure-detail-info">
          <h1 className="epicure-detail-name">{restaurant.name}</h1>
          {restaurant.chef && (
            <p className="epicure-detail-chef">{restaurant.chef.name}</p>
          )}
          <span className="epicure-detail-open">
            {TEXT.restaurantDetail.openNow}
          </span>
        </div>
        <DishGrid dishes={restaurant.dishes ?? []} />
      </main>
      <Footer />
    </div>
  );
}
