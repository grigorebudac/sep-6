import { WATCH_LIST_TAG, RootApi } from "redux/apis/root.api";
import { WatchList } from "types";

export const WatchListEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getWatchLists: builder.query<WatchList.WatchList[], void>({
      query: () => ({
        url: `/watchlists`,
        params: {},
      }),
      providesTags: (res) => {
        return (res ?? []).map(({ id }) => ({
          type: WATCH_LIST_TAG,
          id,
        }));
      },
    }),
    createWatchList: builder.mutation<WatchList.WatchList, WatchList.CreateWatchListPayload>({
      query: (body) => {
        return {
          url: "/watchlists",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [WATCH_LIST_TAG],
    }),
    addMovieToWatchList: builder.mutation<WatchList.Movie, WatchList.addMovieToWatchListPayload>({
      query: ({ watchListId, movieId, title, cover }) => {
        return {
          url: `/watchlists/${watchListId}/movies`,
          method: "PUT",
          body: {
            movieId,
            title,
            cover,
          },
        };
      },
      invalidatesTags: (res) => [
        {
          type: WATCH_LIST_TAG,
          id: res?.movieId,
        },
      ],
    }),
    editWatchList: builder.mutation<WatchList.WatchList, WatchList.UpdateWatchListInput>({
      query: (body) => {
        return {
          url: `/watchlists/${body.id}`,
          method: "PATCH",
          body: {
            title: body.title,
          },
        };
      },
      invalidatesTags: (res) => [
        {
          type: WATCH_LIST_TAG,
          id: res?.id,
        },
      ],
    }),
    deleteWatchList: builder.mutation<WatchList.DeleteMovieFromWatchListResponse, WatchList.DeleteWatchListPayload>({
      query: ({ id }) => {
        return {
          url: `/watchlists/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: (res) => [
        {
          type: WATCH_LIST_TAG,
          id: res?.movieId,
        },
      ],
    }),
    deleteMovieFromWatchList: builder.mutation<WatchList.DeleteMovieFromWatchListResponse, WatchList.DeleteMovieFromWatchListPayload>({
      query: ({ watchListId, movieId }) => {
        return {
          url: `/watchlists/${watchListId}/movies/${movieId}`,
          method: "DELETE"
        };
      },
      invalidatesTags: (res) => [
        {
          type: WATCH_LIST_TAG,
          id: res?.movieId,
        },
      ],
    }),
  }),
});

export const {
  useGetWatchListsQuery,
  useCreateWatchListMutation,
  useAddMovieToWatchListMutation,
  useEditWatchListMutation,
  useDeleteWatchListMutation,
  useDeleteMovieFromWatchListMutation
} = WatchListEndpoints;
