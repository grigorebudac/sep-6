import { CREDITS_TAG, TmdbApi } from "redux/apis/tmdb.api";
import { Credits } from "types";

export const CreditsEndpoints = TmdbApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMovieCredits: builder.query<Credits.Credits, number | string>({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
      }),
      providesTags: (res) => {
        return [
          {
            type: CREDITS_TAG,
            id: res?.id,
          },
        ];
      },
    })
  }),
});

export const { useLazyGetMovieCreditsQuery } = CreditsEndpoints;
