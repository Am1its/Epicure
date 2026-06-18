import { RestaurantsGrid } from '../../components/RestaurantsGrid';
import { TEXT } from '../../lib/text';

export default async function RestaurantsPage({
  searchParams,
}: {
  searchParams: Promise<{ cuisine?: string }>;
}) {
  const { cuisine } = await searchParams;
  return (
    <div>
      <main>
        <h1 className="epicure-restaurants-page-title">{TEXT.shared.restaurants}</h1>
        <RestaurantsGrid initialCuisine={cuisine} />
      </main>
    </div>
  );
}
