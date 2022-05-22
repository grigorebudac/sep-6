import { REVIEW_TAG, RootApi } from 'redux/apis/root.api';
import { user as userSelector } from 'redux/selectors/user.selectors';
import store from 'redux/store';
import { Review } from 'types';

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
          url: '/reviews',
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(values, { dispatch, queryFulfilled }) {
        const user = userSelector(store.getState());
        const currentDate = Date.now().toString();

        const patchResult = dispatch(
          ReviewEndpoints.util.updateQueryData(
            'getReviews',
            { movieId: values.movieId },
            (draft) => {
              draft.push({
                id: String(Date.now()),
                rating: values.rating,
                message: values.message,
                authorId: user.id,
                author: {
                  name: user.name,
                  picture: user.picture,
                },
                createdAt: currentDate,
                updatedAt: currentDate,
              });
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [REVIEW_TAG],
    }),
    deleteReview: builder.mutation<
      Review.DeleteReviewResponse,
      Review.DeleteReviewPayload
    >({
      query: ({ reviewId }) => {
        return {
          url: `/reviews/${reviewId}`,
          method: 'DELETE',
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
