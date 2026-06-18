'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Chef, Restaurant } from '@org/shared-types';
import { fetchApi, strapiImageUrl } from '../lib/api';
import { TEXT } from '../lib/text';
import { Modal } from './Modal';
import { Carousel } from './Carousel';

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
      {/* Desktop X — outside Modal so position:fixed isn't clipped by transform ancestor */}
      <button
        type="button"
        className="epicure-chef-modal__close-desktop"
        onClick={onClose}
        aria-label={TEXT.chefModal.closeAriaLabel}
      >
        <img src="/icons/x.svg" alt="" aria-hidden="true" width={24} height={24} />
      </button>

      <Modal
        onClose={onClose}
        ariaLabel={TEXT.chefModal.dialogAriaLabel}
        closeAriaLabel={TEXT.chefModal.closeAriaLabel}
        backdropClassName="epicure-chef-modal__backdrop"
        className="epicure-chef-modal"
      >
        {/* Mobile X — in-flow inside modal */}
        <button
          type="button"
          className="epicure-chef-modal__close-mobile"
          onClick={onClose}
          aria-label={TEXT.chefModal.closeAriaLabel}
        >
          <img src="/icons/x.svg" alt="" aria-hidden="true" width={24} height={24} />
        </button>

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
            <Carousel className="epicure-chef-modal__carousel">
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
            </Carousel>
          </div>
        )}
      </Modal>
    </>
  );
}
