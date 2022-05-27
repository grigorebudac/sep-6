import { ACTOR_TAG, ACTOR_MOVIE, TmdbApi } from 'redux/apis/tmdb.api';
import { Person } from 'types';

export const PersonEndpoint = TmdbApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getActor: builder.query<Person.ActorResponse, number>({
      query: (actorId) => ({
        url: `/person/${actorId}`,
        params: {},
      }),
      providesTags: (res) => {
        return [
          {
            type: ACTOR_TAG,
            id: res?.id,
          },
        ];
      },
    }),
    getMovies: builder.query<Person.MovieResponse, number>({
      query: (actorId) => ({
        url: `person/${actorId}/movie_credits`,
        params: {},
      }),
      providesTags: (res) => {
        return (res?.cast ?? []).map(({ id }) => ({
          type: ACTOR_MOVIE,
          id,
        }));
      },
    }),
  }),
});

export const { useLazyGetActorQuery, useLazyGetMoviesQuery } = PersonEndpoint;
