import type { StrapiImage } from '@org/shared-types';

export interface StrapiChef {
  id: number;
  name: string;
  image?: StrapiImage;
  [key: string]: unknown;
}

export interface StrapiDish {
  id: number;
  name: string;
  description?: string;
  price: number;
  type?: 'Spicy' | 'Vegan' | 'Vegetarian';
  image?: StrapiImage;
  mealTime?: 'Breakfast' | 'Lunch' | 'Dinner';
  isSignatureDish?: boolean;
  [key: string]: unknown;
}

export interface StrapiRestaurant {
  id: number;
  name: string;
  rating: number;
  createdAt?: string;
  image?: StrapiImage;
  chef?: StrapiChef;
  dishes?: StrapiDish[];
  [key: string]: unknown;
}
