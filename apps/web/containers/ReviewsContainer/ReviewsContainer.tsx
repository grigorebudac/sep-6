import React from 'react';
import { Box } from '@mui/material';
import ReviewCard from 'components/Cards/ReviewCard';
import LeaveReviewForm from 'components/Forms/LeaveReviewForm';
import { Review } from 'types';
import { useCreateReviewMutation } from 'redux/endpoints/review.endpoints';
import SkeletonList from 'components/Skeletons/SkeletonList';
import ReviewCardSkeleton from 'components/Skeletons/ReviewCardSkeleton';

interface ReviewsContainerProps {
  movieId: number;
  reviews?: Review.Review[];
  isLoading: boolean;
}

const ReviewsContainer = (props: ReviewsContainerProps) => {
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
      {props.isLoading ? (
        <SkeletonList count={5}>
          <ReviewCardSkeleton />
        </SkeletonList>
      ) : (
        props.reviews?.map((review) => (
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
