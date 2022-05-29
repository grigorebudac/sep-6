import { TmdbApi, DISCOVER_TAG } from "redux/apis/tmdb.api";
import { Discover } from "types";

export const DiscoverEndpoints = TmdbApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMoviesOfActor: builder.query<Discover.DiscoverResponse, Discover.DiscoverRequestPayload>({
      query: ({ actorId, page }) => ({
        url: `/discover/movie?with_cast=${actorId}&page=${page}`,
        params: { actorId, page },
      }),
      providesTags: (res) => {
        return [
          {
            type: DISCOVER_TAG,
          }
        ];
      },
    })
  }),
});

export const { useLazyGetMoviesOfActorQuery } = DiscoverEndpoints;
