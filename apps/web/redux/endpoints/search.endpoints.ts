import { POPULAR_MOVIE_TAG, TmdbApi } from 'redux/apis/tmdb.api';
import { Movie } from 'types';

export const SearchEndpoints = TmdbApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSearchResults: builder.query<Movie.Movie[], string>({
      query: (text) => ({
        url: `/search/movie`,
        params: {
          query: text,
        },
      }),
      providesTags: (res) => {
        return (res ?? []).map(({ id }) => ({
          type: POPULAR_MOVIE_TAG,
          id,
        }));
      },
      transformResponse: (res: Movie.GetPopularMoviesResponse) => {
        if (res?.results == null) {
          return [];
        }

        return res.results.filter((result) => result.poster_path != null);
      },
    }),
  }),
});

export const { useLazyGetSearchResultsQuery } = SearchEndpoints;
