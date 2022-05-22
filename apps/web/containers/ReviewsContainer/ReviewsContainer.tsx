import React from 'react';
import { Box } from '@mui/material';
import ReviewCard from 'components/Cards/ReviewCard';
import LeaveReviewForm from 'components/Forms/LeaveReviewForm';
import { Review } from 'types';

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

const ReviewsContainer = () => {
  function handleCreateReview(values: Review.LeaveReviewInput) {}
  return (
    <div>
      {REVIEWS.map((review) => (
        <Box key={review.name} marginBottom="2rem">
          <ReviewCard {...review} />
        </Box>
      ))}

      <Box marginTop="2rem">
        <LeaveReviewForm onSubmit={handleCreateReview} />
      </Box>
    </div>
  );
};

export default ReviewsContainer;
