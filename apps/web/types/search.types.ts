import { Movie } from './movie.types';
import { Person } from './person.types';

export declare module Search {
  type SearchResult = Person.ActorResponse | Movie.Movie;
  type SearchResults = SearchResult[];

  interface GetMultiSearchResponse {
    page: number;
    results: SearchResults;
    total_results: number;
    total_pages: number;
  }
}
