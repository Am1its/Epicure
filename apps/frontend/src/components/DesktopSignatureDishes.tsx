import { DishCard } from '@org/ui-components';
import type { Dish } from '@org/shared-types';
import { TEXT } from '../lib/text';

interface Props {
  dishes: Dish[];
}

export function DesktopSignatureDishes({ dishes }: Props) {
  if (dishes.length === 0) return null;

  return (
    <section className="epicure-desktop-signature">
      <h2 className="epicure-desktop-signature__title">{TEXT.home.signatureDishTitle}</h2>
      <div className="epicure-desktop-signature__grid">
        {dishes.map(dish => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
}
