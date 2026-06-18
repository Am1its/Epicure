'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Chef, Restaurant } from '@org/shared-types';
import { fetchApi, strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';

interface ChefModalProps {
  chef: Chef;
  onClose: () => void;
}

export function ChefModal({ chef, onClose }: ChefModalProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    fetchApi<Restaurant[]>('/api/restaurants')
      .then(all => setRestaurants(all.filter(r => r.chef?.id === chef.id)))
      .catch(() => setRestaurants([]));
  }, [chef.id]);

  return (
    <>
      <button
        type="button"
        className="epicure-chef-modal__backdrop"
        onClick={onClose}
        aria-label={TEXT.chefModal.closeAriaLabel}
      />
      <div className="epicure-chef-modal__outer">
        <button
          type="button"
          className="epicure-chef-modal__close"
          onClick={onClose}
          aria-label={TEXT.chefModal.closeAriaLabel}
        >
          <img src="/icons/x.svg" alt="" aria-hidden="true" width={24} height={24} />
        </button>
        <div className="epicure-chef-modal" role="dialog" aria-label={TEXT.chefModal.dialogAriaLabel}>
          <div className="epicure-chef-modal__image-wrap">
            {chef.image && (
              <img
                src={strapiImageUrl(chef.image.url)}
                alt={chef.name}
                className="epicure-chef-modal__image"
              />
            )}
            <div className="epicure-chef-modal__name-band">
              <span className="epicure-chef-modal__name">{chef.name}</span>
            </div>
          </div>
          {chef.bio && (
            <p className="epicure-chef-modal__bio">{chef.bio}</p>
          )}
          {restaurants.length > 0 && (
            <div className="epicure-chef-modal__restaurants">
              <h3 className="epicure-chef-modal__restaurants-title">{TEXT.chefModal.restaurantsTitle}</h3>
              <div className="epicure-chef-modal__carousel">
                {restaurants.map(r => (
                  <Link
                    key={r.id}
                    href={`/restaurants/${r.id}`}
                    className="epicure-chef-modal__rest-item"
                    onClick={onClose}
                  >
                    <img
                      src={strapiImageUrl(r.image?.url)}
                      alt={r.name}
                      className="epicure-chef-modal__rest-img"
                    />
                    <div className="epicure-chef-modal__rest-info">
                      <span className="epicure-chef-modal__rest-name">{r.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
