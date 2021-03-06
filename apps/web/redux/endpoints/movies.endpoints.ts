import {
  GENRE_TAG,
  MOVIE_TAG,
  POPULAR_MOVIE_TAG,
  MOVIE_VIDEO_TAG,
  TmdbApi,
} from 'redux/apis/tmdb.api';
import { Movie } from 'types';

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
    getMovieVideo: builder.query<Movie.MovieVideoResponse, string | number>({
      query: (movieId) => ({
        url: `movie/${movieId}/videos`,
        params: {},
      }),
      providesTags: (res) => {
        return [
          {
            type: MOVIE_VIDEO_TAG,
            id: res?.id,
          },
        ];
      },
    }),
    discoverMovies: builder.query<
      Movie.GetPopularMoviesResponse,
      Record<string, string>
    >({
      query: (filters) => ({
        url: `/discover/movie`,
        params: {
          ...filters,
        },
      }),
      providesTags: (res) => {
        return (res?.results ?? []).map(({ id }) => ({
          type: POPULAR_MOVIE_TAG,
          id,
        }));
      },
    }),
    getGenres: builder.query<Movie.Genre[], void>({
      query: () => ({
        url: `/genre/movie/list`,
        params: {},
      }),
      providesTags: (res) => {
        return (res ?? []).map(({ id }) => ({
          type: GENRE_TAG,
          id,
        }));
      },
      transformResponse: (res: Movie.GetGenresResponse) => {
        if (res?.genres == null) {
          return [];
        }

        return res.genres;
      },
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useLazyGetMovieQuery,
  useLazyGetMovieVideoQuery,
  useGetGenresQuery,
  useLazyDiscoverMoviesQuery,
} = MoviesEndpoints;
