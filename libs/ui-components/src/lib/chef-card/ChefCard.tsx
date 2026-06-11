import type { Chef } from '@org/shared-types';

interface ChefCardProps {
  chef: Chef;
  imageUrl?: string;
}

export function ChefCard({ chef, imageUrl }: ChefCardProps) {
  return (
    <div className="epicure-chef-card">
      <img
        src={imageUrl ?? '/icons/logo.svg'}
        alt={chef.name}
        className="epicure-chef-card__image"
      />
      <div className="epicure-chef-card__info">
        <p className="epicure-chef-card__name">{chef.name}</p>
      </div>
    </div>
  );
}
