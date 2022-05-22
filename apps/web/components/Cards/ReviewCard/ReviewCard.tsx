import { Avatar, Grid, Rating, Typography } from "@mui/material";
import React from "react";

import * as Styles from "./ReviewCard.styles";

const ReviewCard = () => {
  return (
    <Grid container gap={3}>
      <Grid item xs={2}>
        <Styles.UserInfo>
          <Avatar>JS</Avatar>
          <Typography variant="subtitle2" fontWeight="600" marginTop="1rem">
            Jayvion Simon
          </Typography>
          <Typography variant="subtitle2">22 May 2022</Typography>
        </Styles.UserInfo>
      </Grid>
      <Grid item xs={7}>
        <Rating value={2} readOnly />

        <Typography variant="body2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          ullam blanditiis, ipsa, perferendis beatae voluptatem ea excepturi
          quaerat fuga officiis odit necessitatibus aliquam, veniam natus et quo
          in hic autem.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReviewCard;
