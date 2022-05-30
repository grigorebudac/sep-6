import { Credits } from './credits.types';

export declare module Analytics {
  interface AverageRatingOverYears {
    year: number;
    rating: number;
  }

  interface FavoriteGenres {
    id: number;
    name: string;
    quantity: number;
  }

  interface FavoriteAcotrs {
    quantity: number;
    actor: Credits.Cast;
  }
}
