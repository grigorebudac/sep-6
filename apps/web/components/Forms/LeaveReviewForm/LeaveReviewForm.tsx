import React from "react";
import { Box, TextField, Grid, Rating } from "@mui/material";

import * as Styles from "./LeaveReviewForm.styles";

const LeaveReviewForm = () => {
  return (
    <Grid container gap={3}>
      <Grid item xs={2}></Grid>
      <Grid item xs={7}>
        <Box marginTop="1rem">
          <TextField label="Review" multiline rows={4} fullWidth />
        </Box>

        <Box marginTop="1rem">
          <Rating />
        </Box>

        <Box marginTop="1rem">
          <Styles.Button>Submit</Styles.Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LeaveReviewForm;
