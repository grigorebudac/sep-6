import { REVIEW_TAG, RootApi } from "redux/apis/root.api";
import { Review } from "types";

export const ReviewEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReviews: builder.query<Review.Review[], Review.GetReviewsPayload>({
      query: ({ movieId }) => {
        return `/reviews?movieId=${movieId}`;
      },
      providesTags: (res) => {
        return (res ?? []).map(({ id }) => ({
          type: REVIEW_TAG,
          id,
        }));
      },
    }),
    createReview: builder.mutation<Review.Review, Review.CreateReviewPayload>({
      query: (body) => {
        return {
          url: "/review",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [REVIEW_TAG],
    }),
    deleteReview: builder.mutation<
      Review.DeleteReviewResponse,
      Review.DeleteReviewPayload
    >({
      query: (body) => {
        return {
          url: "/review",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: (res) => [
        {
          type: REVIEW_TAG,
          id: res?.reviewId,
        },
      ],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsQuery,
} = ReviewEndpoints;
