import { ACTOR_TAG, TmdbApi } from 'redux/apis/tmdb.api';
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
  }),
});

export const { useLazyGetActorQuery } = PersonEndpoint;
