import { Movie } from './movie.types';

export declare module Person {
  interface GetPeopleResponse {
    page: number;
    results: ActorResponse[];
    total_pages: number;
    total_results: number;
  }
  interface ActorResponse {
    id: number;
    name: string;
    profile_path: string;
    popularity: number;
    place_of_birth: string;
    biography: string;
    birthday: string;
    deathday?: string;
  }

  interface MovieResponse {
    cast: Movie.Movie[];
    crew: any[];
    id: number;
  }
}
