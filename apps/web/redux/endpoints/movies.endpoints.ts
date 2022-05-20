import { TmdbApi } from "redux/apis/tmdb.api";
import { Movie } from "types";

export const ReviewEndpoints = TmdbApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPopularMovies: builder.query<Movie.GetPopularMoviesResponse, void>({
      query: () => ({
        url: `/movie/popular`,
        params: {},
      }),
    }),
  }),
});

export const { useGetPopularMoviesQuery } = ReviewEndpoints;
