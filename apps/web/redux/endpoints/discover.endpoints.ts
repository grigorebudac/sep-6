import {
  TmdbApi,
  DISCOVER_TAG,
  DISCOVER_GENRES_TAG,
} from 'redux/apis/tmdb.api';
import { Discover } from 'types';

export const DiscoverEndpoints = TmdbApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMoviesOfActor: builder.query<
      Discover.DiscoverResponse,
      Discover.DiscoverRequestPayload
    >({
      query: ({ personId, page }) => ({
        url: `/discover/movie?with_cast=${personId}&page=${page}`,
        params: {},
      }),
      providesTags: (res) => {
        return [
          {
            type: DISCOVER_TAG,
          },
        ];
      },
    }),
    getMoviesByGenres: builder.query<Discover.DiscoverResponse, number[]>({
      query: (genres) => ({
        url: `/discover/movie?with_genres=${genres}`,
        params: {},
      }),
      providesTags: (res) => {
        return [
          {
            type: DISCOVER_GENRES_TAG,
          },
        ];
      },
    }),
  }),
});

export const { useLazyGetMoviesOfActorQuery, useLazyGetMoviesByGenresQuery } =
  DiscoverEndpoints;
