import type { StrapiImage } from '@org/shared-types';

export interface StrapiChef {
  id: number;
  name: string;
  image?: StrapiImage;
  bio?: string;
  chefOfTheWeek?: boolean;
  chefOfTheWeekOrder?: number;
  restaurants?: Omit<StrapiRestaurant, 'chef' | 'dishes' | 'createdAt'>[];
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
  sides?: string[];
  changes?: string[];
}

export interface StrapiRestaurant {
  id: number;
  name: string;
  rating: number;
  createdAt?: string;
  image?: StrapiImage;
  chef?: StrapiChef;
  dishes?: StrapiDish[];
  isPopular?: boolean;
  latitude?: number;
  longitude?: number;
  openingHours?: string;
  cuisine?: string;
}

export interface StrapiAuthUser {
  id: number;
  username: string;
  email: string;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: StrapiAuthUser;
}

export interface StrapiNavLink {
  id: number;
  label: string;
  url: string;
}

export interface StrapiNavigation {
  id: number;
  brandName: string;
  logo?: { url: string };
  navLinks: StrapiNavLink[];
  footerLinks: StrapiNavLink[];
}
