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
          <Styles.IconButton size="large">
            <Notifications />
          </Styles.IconButton>

          <Box ml="2rem">
            <ProfilePicture
              showBorder
              src="https://images.unsplash.com/photo-1647891938250-954addeb9c51?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987"
              alt="Test User"
            />
          </Box>
        </Box>
      </Styles.Toolbar>
    </Styles.AppBar>
  );
};

export default ApplicationNavbar;
