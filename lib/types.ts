export type CarCondition = 'Tokunbo' | 'Brand New' | 'Nigerian Used';

export interface CarReview {
  id: string;
  author: string;
  text: string;
  date: string;
  rating: number;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  priceNaira: number;
  mileage: number;
  condition: CarCondition;
  engine: string;
  transmission: string;
  keyFeatures: string[];
  images: string[];
  reviews: CarReview[];
}
