import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MOVIE_TAG = 'MOVIE';
export const POPULAR_MOVIE_TAG = 'MOVIE';
export const CREDITS_TAG = 'CREDITS';
export const ACTOR_TAG = 'ACTOR';
export const ACTOR_MOVIE = 'ACTOR-MOVIE';
export const SEARCH_RESULT = 'SEARCH-RESULT';
export const GENRE_TAG = 'GENRE';
export const COMPANY_TAG = 'COMPANY';

export const TmdbApi = createApi({
  reducerPath: 'TmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_TMDB_API_ENDPOINT}`,
    paramsSerializer: (params) => {
      const output = new URLSearchParams(params);
      output.append('api_key', process.env.NEXT_PUBLIC_TMDB_API_KEY!);

      return output.toString();
    },
  }),
  tagTypes: [
    MOVIE_TAG,
    POPULAR_MOVIE_TAG,
    CREDITS_TAG,
    ACTOR_TAG,
    ACTOR_MOVIE,
    SEARCH_RESULT,
    GENRE_TAG,
    COMPANY_TAG,
  ],
  endpoints: () => ({}),
});
