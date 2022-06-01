import React, { useState } from 'react';
import {
  Auth,
  CognitoHostedUIIdentityProvider,
  AuthErrorStrings,
} from '@aws-amplify/auth';
import { AuthenticationLayout } from 'components/Layouts/AuthenticationLayout';
import { LoginForm } from 'components/Forms/LoginForm';
import { User } from 'types';
import { withPublicRoute } from 'hocs/withPublicRoute';
import { useRouter } from 'next/router';
import OAuthButtonsSection from 'components/Sections/OAuthButtonsSection';
import { Box, Typography } from '@mui/material';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(credentials: User.LoginInput) {
    setError('');
    try {
      await Auth.signIn(credentials.email, credentials.password);
      router.push('/');
    } catch (error) {
      error instanceof Error ? setError(error.message) : setError('');
    }
  }

  function handleSignInWithProvider(provider: CognitoHostedUIIdentityProvider) {
    Auth.federatedSignIn({ provider });
  }

  return (
    <AuthenticationLayout title="Log in">
      <LoginForm onSubmit={handleSubmit} />

      <Box mt="1rem">
        <OAuthButtonsSection
          onClickGoogle={() =>
            handleSignInWithProvider(CognitoHostedUIIdentityProvider.Google)
          }
          onClickFacebook={() =>
            handleSignInWithProvider(CognitoHostedUIIdentityProvider.Facebook)
          }
        />
      </Box>

      {error && (
        <Typography marginTop={2} color="#ff0000">
          {error}
        </Typography>
      )}
    </AuthenticationLayout>
  );
};

export default withPublicRoute(Login);
