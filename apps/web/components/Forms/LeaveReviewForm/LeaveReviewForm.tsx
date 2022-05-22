import React from 'react';
import { Box, Grid, Button } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Review } from 'types';
import { TextFieldController } from 'components/Controllers/TextFieldController';
import { ReviewController } from 'components/Controllers/ReviewController';

type LeaveReviewFormProps = {
  onSubmit: (values: Review.LeaveReviewInput) => void;
};

const schema = yup.object().shape({
  rating: yup.string().required('You have to leave a review'),
});

const LeaveReviewForm = (props: LeaveReviewFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Review.LeaveReviewInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: '',
      message: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Grid container gap={3}>
        <Grid item xs={2}></Grid>
        <Grid item xs={9}>
          <Box marginTop="1rem">
            <TextFieldController
              name="message"
              label="Review"
              multiline
              rows={4}
              fullWidth
              error={errors?.message}
              control={control}
            />
          </Box>

          <Box marginTop="1rem">
            <ReviewController
              name="rating"
              error={errors?.rating}
              control={control}
            />
          </Box>

          <Box marginTop="1rem">
            <Button type="submit">Submit</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default LeaveReviewForm;
