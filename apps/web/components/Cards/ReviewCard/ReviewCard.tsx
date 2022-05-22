import { Avatar, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import { format } from "date-fns";
import { getNameInitials } from "utils/string.utils";

import * as Styles from "./ReviewCard.styles";

interface ReviewCardProps {
  name: string;
  message?: string;
  rating: number | string;
  date: number;
}

const ReviewCard = (props: ReviewCardProps) => {
  const date = format(new Date(props.date), "dd MMM yyyy"); // 22 May 2022

  return (
    <Grid container gap={3}>
      <Grid item xs={2}>
        <Styles.UserInfo>
          <Avatar>{getNameInitials(props.name)}</Avatar>
          <Typography variant="subtitle2" fontWeight="600" marginTop="1rem">
            {props.name}
          </Typography>
          <Typography variant="subtitle2">{date}</Typography>
        </Styles.UserInfo>
      </Grid>
      <Grid item xs={7}>
        <Rating value={Number(props.rating)} readOnly />

        {props.message != null && (
          <Typography variant="body2">{props.message}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ReviewCard;
