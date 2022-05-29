import { PERSON_TAG, PERSON_MOVIE, TmdbApi } from 'redux/apis/tmdb.api';
import { Person } from 'types';

export const PersonEndpoint = TmdbApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPerson: builder.query<Person.PersonResponse, number>({
      query: (personId) => ({
        url: `/person/${personId}`,
        params: {},
      }),
      providesTags: (res) => {
        return [
          {
            type: PERSON_TAG,
            id: res?.id,
          },
        ];
      },
    }),
    getMovies: builder.query<Person.MovieResponse, number>({
      query: (personId) => ({
        url: `person/${personId}/movie_credits`,
        params: {},
      }),
      providesTags: (res) => {
        return (res?.cast || []).map(({ id }) => ({
          type: PERSON_MOVIE,
          id,
        }));
      },
    }),
  }),
});

export const { useLazyGetPersonQuery, useLazyGetMoviesQuery } = PersonEndpoint;
