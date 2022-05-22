import React from "react";
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

import ProfilePicture from "components/Avatars/ProfilePicture";

import * as Styles from "./LeaveReviewInput.styles";

const LeaveReviewInput = () => {
  return (
    <Grid container gap={1}>
      <Grid item xs={1}>
        <ProfilePicture />
      </Grid>
      <Grid item xs={10}>
        <Typography>Test User</Typography>

        <Box marginTop="1rem">
          <Rating />
        </Box>

        <Box marginTop="1rem">
          <TextField label="Review" multiline rows={4} fullWidth />
        </Box>

        <Box marginTop="1rem">
          <Button color="primary">Submit</Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LeaveReviewInput;
