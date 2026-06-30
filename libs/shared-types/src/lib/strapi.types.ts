export interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface ChefRestaurant {
  id: number;
  name: string;
  image?: StrapiImage;
  rating: number;
  cuisine?: string;
  isPopular?: boolean;
  latitude?: number;
  longitude?: number;
  openingHours?: string;
}

export interface Chef {
  id: number;
  name: string;
  image?: StrapiImage;
  bio?: string;
  chefOfTheWeek?: boolean;
  chefOfTheWeekOrder?: number;
  restaurants?: ChefRestaurant[];
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
  restaurantId?: number;
  restaurantName?: string;
  sides?: string[];
  changes?: string[];
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
  cuisine?: string;
}

export interface CartItem {
  dish: Dish;
  imageUrl: string;
  quantity: number;
  selectedSide?: string;
  selectedChanges: string[];
  restaurantId: number;
  restaurantName: string;
  pendingRemove?: boolean;
}

export interface SearchResults {
  restaurants: { id: number; name: string }[];
  chefs: { id: number; name: string }[];
  cuisines: { label: string }[];
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

export interface NavLink {
  label: string;
  url: string;
}

export interface NavigationResponse {
  brandName: string;
  logoUrl: string | null;
  navLinks: NavLink[];
  footerLinks: NavLink[];
}
