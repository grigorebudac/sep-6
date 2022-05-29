import {
  PERSON_TAG,
  COMPANY_TAG,
  POPULAR_MOVIE_TAG,
  TmdbApi,
} from 'redux/apis/tmdb.api';
import { Company } from 'types/company.types';
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
          const type = isMovie(option) ? POPULAR_MOVIE_TAG : PERSON_TAG;

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
    searchPeople: builder.query<Person.PersonResponse[], string>({
      query: (query) => ({
        url: `/search/person`,
        params: {
          query,
        },
      }),
      providesTags: (res) => {
        return (res ?? []).map((option) => {
          return {
            type: PERSON_TAG,
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
    searchCompanies: builder.query<Company.Company[], string>({
      query: (query) => ({
        url: `/search/company`,
        params: {
          query,
        },
      }),
      providesTags: (res) => {
        return (res ?? []).map((option) => {
          return {
            type: COMPANY_TAG,
            id: option.id,
          };
        });
      },
      transformResponse: (res: Company.GetCompaniesResponse) => {
        if (res.results == null) {
          return [];
        }

        return res.results;
      },
    }),
  }),
});

export const {
  useLazyGetSearchResultsQuery,
  useLazySearchPeopleQuery,
  useLazySearchCompaniesQuery,
} = SearchEndpoints;
