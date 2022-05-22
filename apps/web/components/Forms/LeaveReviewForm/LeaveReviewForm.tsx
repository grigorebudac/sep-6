import React from "react";
import { Box, TextField, Grid, Rating } from "@mui/material";

import * as Styles from "./LeaveReviewForm.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Review } from "types";
import { TextFieldController } from "components/Controllers/TextFieldController";
import { ReviewController } from "components/Controllers/ReviewController";

type LeaveReviewFormProps = {
  onSubmit: (values: Review.LeaveReviewInput) => void;
};

const schema = yup.object().shape({
  rating: yup.string().required("You have to leave a review"),
});

const LeaveReviewForm = (props: LeaveReviewFormProps) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<Review.LeaveReviewInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: "0",
      message: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Grid container gap={3}>
        <Grid item xs={2}></Grid>
        <Grid item xs={7}>
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
            <Styles.Button type="submit">Submit</Styles.Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default LeaveReviewForm;
