import React from 'react';
import { Box, Grid } from '@mui/material';

import * as Styles from './ReviewCardSkeleton.styles';

const ReviewCardSkeleton = () => {
  return (
    <Grid container gap={3}>
      <Grid item xs={2}>
        <Styles.CenteredSkeleton variant="circular" width={40} height={40} />

        <Box marginTop="1rem">
          <Styles.CenteredSkeleton
            variant="rectangular"
            width="60%"
            height={10}
          />
        </Box>

        <Box marginTop="0.5rem">
          <Styles.CenteredSkeleton
            variant="rectangular"
            width="40%"
            height={10}
          />
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Styles.RoundedSkeleton
          variant="rectangular"
          width="100%"
          height={100}
        />
      </Grid>
    </Grid>
  );
};

export default ReviewCardSkeleton;
