import { MOVIE_TAG, POPULAR_MOVIE_TAG, TmdbApi } from "redux/apis/tmdb.api";
import { Movie } from "types";

export const MoviesEndpoints = TmdbApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMovie: builder.query<Movie.GetMovieResponse, number | string>({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
        params: {},
      }),
      providesTags: (res) => {
        return [
          {
            type: MOVIE_TAG,
            id: res?.id,
          },
        ];
      },
    }),
    getPopularMovies: builder.query<Movie.GetPopularMoviesResponse, void>({
      query: () => ({
        url: `/movie/popular`,
        params: {},
      }),
      providesTags: (res) => {
        return (res?.results ?? []).map(({ id }) => ({
          type: POPULAR_MOVIE_TAG,
          id,
        }));
      },
    }),
  }),
});

export const { useGetPopularMoviesQuery, useLazyGetMovieQuery } =
  MoviesEndpoints;
