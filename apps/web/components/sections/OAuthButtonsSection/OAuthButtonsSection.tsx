import { Box, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import React from 'react';

interface OAuthButtonsSectionProps {
  onClickGoogle: () => void;
  onClickFacebook: () => void;
}

const OAuthButtonsSection = (props: OAuthButtonsSectionProps) => {
  return (
    <Box display="flex" justifyContent="center" gap="1rem" mt="1rem">
      <Button startIcon={<GoogleIcon />} onClick={props.onClickGoogle}>
        Login with Google
      </Button>
      <Button startIcon={<FacebookIcon />} onClick={props.onClickFacebook}>
        Login with Facebook
      </Button>
    </Box>
  );
};

export default OAuthButtonsSection;
