export declare module Review {
  interface Review {
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

  interface CreateReviewPayload {
    movieId: string;
    message?: string;
    rating?: number;
  }

  interface DeleteReviewPayload {
    reviewId: string;
  }

  interface DeleteReviewResponse {
    reviewId: string;
  }

  interface GetReviewsPayload {
    movieId: string;
  }
}
