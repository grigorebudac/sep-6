export declare module Discover {

  interface DiscoverResponse {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
  }

  interface Result {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    release_date_js: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  interface DiscoverRequestPayload {
    page: number;
    actorId: number;
  }

}

