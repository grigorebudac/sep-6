import React from 'react';
import { Box } from '@mui/material';
import ReviewCard from 'components/Cards/ReviewCard';
import LeaveReviewForm from 'components/Forms/LeaveReviewForm';
import { Review } from 'types';
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from 'redux/endpoints/review.endpoints';
import SkeletonList from 'components/Skeletons/SkeletonList';
import ReviewCardSkeleton from 'components/Skeletons/ReviewCardSkeleton';

interface ReviewsContainerProps {
  movieId: number;
}

const ReviewsContainer = (props: ReviewsContainerProps) => {
  const { data, isLoading } = useGetReviewsQuery({ movieId: props.movieId });
  const [createReview] = useCreateReviewMutation();

  async function handleCreateReview(values: Review.LeaveReviewInput) {
    try {
      await createReview({
        movieId: props.movieId,
        rating: Number(values.rating),
        message: values.message,
      }).unwrap();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div>
      {isLoading ? (
        <SkeletonList count={5}>
          <ReviewCardSkeleton />
        </SkeletonList>
      ) : (
        data?.map((review) => (
          <Box key={review.id} marginBottom="2rem">
            <ReviewCard
              name={review.author.name!}
              message={review.message}
              rating={review.rating!}
              date={review.createdAt}
            />
          </Box>
        ))
      )}

      <Box marginTop="2rem">
        <LeaveReviewForm onSubmit={handleCreateReview} />
      </Box>
    </div>
  );
};

export default ReviewsContainer;
