import { Movie } from './movie.types';

export declare module Person {
  interface GetPeopleResponse {
    page: number;
    results: PersonResponse[];
    total_pages: number;
    total_results: number;
  }
  interface PersonResponse {
    id: number;
    name: string;
    profile_path: string;
    popularity: number;
    place_of_birth: string;
    biography: string;
    birthday: string;
    deathday?: string;
    known_for_department?: string;
  }

  interface MovieResponse {
    cast: Movie.Movie[];
    crew: any[];
    id: number;
  }
}
