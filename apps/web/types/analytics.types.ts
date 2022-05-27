import { Person } from "./person.types";

export declare module Analytics {
  interface AverageRatingOverYears {
    year: number,
    rating: number,
  }

  interface FavoriteGenres {
    name: string;
    quantity: number;
  }

  interface FavoriteAcotrs {
    quantity: number;
    actor: Person.ActorResponse
  }
}
