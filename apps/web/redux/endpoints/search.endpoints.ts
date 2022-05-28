import { ACTOR_TAG, POPULAR_MOVIE_TAG, TmdbApi } from 'redux/apis/tmdb.api';
import { Person } from 'types/person.types';
import { Search } from 'types/search.types';
import { isMovie } from 'utils/tmdb.utils';

export const SearchEndpoints = TmdbApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSearchResults: builder.query<Search.SearchResults, string>({
      query: (text) => ({
        url: `/search/multi`,
        params: {
          query: text,
        },
      }),
      providesTags: (res) => {
        return (res ?? []).map((option) => {
          const type = isMovie(option) ? POPULAR_MOVIE_TAG : ACTOR_TAG;

          return {
            type,
            id: option.id,
          };
        });
      },
      transformResponse: (res: Search.GetMultiSearchResponse) => {
        if (res?.results == null) {
          return [];
        }

        return res.results.filter((result) =>
          isMovie(result)
            ? result.poster_path != null
            : result.profile_path != null,
        );
      },
    }),
    searchPeople: builder.query<Person.ActorResponse[], string>({
      query: (query) => ({
        url: `/search/person`,
        params: {
          query,
        },
      }),
      providesTags: (res) => {
        return (res ?? []).map((option) => {
          return {
            type: ACTOR_TAG,
            id: option.id,
          };
        });
      },
      transformResponse: (res: Person.GetPeopleResponse) => {
        if (res.results == null) {
          return [];
        }

        return res.results;
      },
    }),
  }),
});

export const { useLazyGetSearchResultsQuery, useLazySearchPeopleQuery } =
  SearchEndpoints;
