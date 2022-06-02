import React from 'react';
import { Box } from '@mui/material';
import { Notifications } from '@mui/icons-material';

import ProfilePicture from 'components/Avatars/ProfilePicture';
import SearchInputContainer from 'containers/SearchInputContainer';

import * as Styles from './ApplicationNavbar.styles';

const ApplicationNavbar = () => {
  return (
    <Styles.AppBar elevation={0} position="sticky">
      <Styles.Toolbar>
        <SearchInputContainer />

        <Box display="flex" alignItems="center">

        </Box>
      </Styles.Toolbar>
    </Styles.AppBar>
  );
};

export default ApplicationNavbar;
