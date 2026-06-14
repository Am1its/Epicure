export interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface Chef {
  id: number;
  name: string;
  image?: StrapiImage;
  bio?: string;
  chefOfTheWeek?: boolean;
  chefOfTheWeekOrder?: number;
}

export interface Dish {
  id: number;
  name: string;
  description?: string;
  price: number;
  type?: 'Spicy' | 'Vegan' | 'Vegetarian';
  image?: StrapiImage;
  mealTime?: 'Breakfast' | 'Lunch' | 'Dinner';
  isSignatureDish?: boolean;
  restaurantName?: string;
}

export interface Restaurant {
  id: number;
  documentId?: string;
  name: string;
  image?: StrapiImage;
  chef?: Chef;
  rating: number;
  dishes?: Dish[];
  createdAt?: string;
  isPopular?: boolean;
  distance?: number;
  latitude?: number;
  longitude?: number;
  openingHours?: string;
}

export interface SearchResults {
  restaurants: { id: number; name: string }[];
  chefs: { id: number; name: string }[];
}
