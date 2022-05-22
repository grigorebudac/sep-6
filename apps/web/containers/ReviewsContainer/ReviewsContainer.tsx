import React from 'react';
import { Box } from '@mui/material';
import ReviewCard from 'components/Cards/ReviewCard';
import LeaveReviewForm from 'components/Forms/LeaveReviewForm';
import { Review } from 'types';
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from 'redux/endpoints/review.endpoints';

const REVIEWS = [
  {
    name: 'Joma Simon',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ullam blanditiis, ipsa, perferendis beatae voluptatem ea excepturi quaerat fuga officiis odit necessitatibus aliquam, veniam natus et quo in hic autem.',
    rating: '2',
    date: Date.now(),
  },
  {
    name: 'Jayvion Simon',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ullam blanditiis, ipsa, perferendis beatae voluptatem ea excepturi quaerat fuga officiis odit necessitatibus aliquam, veniam natus et quo in hic autem.',
    rating: '3',
    date: Date.now(),
  },
  {
    name: 'Het Yasd',
    message:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos ullam blanditiis, ipsa, perferendis beatae voluptatem ea excepturi quaerat fuga officiis odit necessitatibus aliquam, veniam natus et quo in hic autem.',
    rating: '5',
    date: Date.now(),
  },
];

interface ReviewsContainerProps {
  movieId: number;
}

const ReviewsContainer = (props: ReviewsContainerProps) => {
  const { data } = useGetReviewsQuery({ movieId: props.movieId });
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
      {data?.map((review) => (
        <Box key={review.id} marginBottom="2rem">
          <ReviewCard
            name={review.author.name!}
            message={review.message}
            rating={review.rating!}
            date={review.createdAt}
          />
        </Box>
      ))}

      <Box marginTop="2rem">
        <LeaveReviewForm onSubmit={handleCreateReview} />
      </Box>
    </div>
  );
};

export default ReviewsContainer;
