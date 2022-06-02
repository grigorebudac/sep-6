import { Box, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import React from 'react';
import * as Styles from './OAuthButtonsSection.styles';

interface OAuthButtonsSectionProps {
  onClickGoogle: () => void;
  onClickFacebook: () => void;
}

const OAuthButtonsSection = (props: OAuthButtonsSectionProps) => {
  return (
    <Box display="flex" justifyContent="center" gap="1rem" mt="1rem">
      <Styles.OAuthButton startIcon={<GoogleIcon />} onClick={props.onClickGoogle}>
        Login with Google
      </Styles.OAuthButton>
      <Styles.OAuthButton startIcon={<FacebookIcon />} onClick={props.onClickFacebook} disabled>
        Login with Facebook
      </Styles.OAuthButton>
    </Box>
  );
};

export default OAuthButtonsSection;
