import { REVIEW_TAG, RootApi } from "redux/apis/root.api";

interface CreateReviewResponse {
  id: string;
  author: Partial<{
    name: string;
    picture: string;
  }>;
  authorId: string;
  message?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export const ReviewEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createReview: builder.mutation<CreateReviewResponse, void>({
      query: () => {
        return {
          url: "/review",
          method: "POST",
          body: {
            movieId: "1",
            message: "Hello World",
          },
        };
      },
      invalidatesTags: [REVIEW_TAG],
    }),
  }),
});

export const { useCreateReviewMutation } = ReviewEndpoints;
