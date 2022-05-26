import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MOVIE_TAG = 'MOVIE';
export const POPULAR_MOVIE_TAG = 'MOVIE';
export const CREDITS_TAG = 'CREDITS';
export const ACTOR_TAG = 'ACTOR';

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
  tagTypes: [MOVIE_TAG, POPULAR_MOVIE_TAG, CREDITS_TAG, ACTOR_TAG],
  endpoints: () => ({}),
});
