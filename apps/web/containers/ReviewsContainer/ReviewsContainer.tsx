import React from "react";
import { Box } from "@mui/material";
import ReviewCard from "components/Cards/ReviewCard";
import LeaveReviewForm from "components/Forms/LeaveReviewForm";

const ReviewsContainer = () => {
  return (
    <div>
      <Box marginBottom="2rem">
        <ReviewCard />
      </Box>

      <Box marginBottom="2rem">
        <ReviewCard />
      </Box>

      <Box marginBottom="4rem">
        <ReviewCard />
      </Box>

      <Box>
        <LeaveReviewForm />
      </Box>
    </div>
  );
};

export default ReviewsContainer;
