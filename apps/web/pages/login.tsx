import React from 'react';
import { Auth, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { AuthenticationLayout } from 'components/Layouts/AuthenticationLayout';
import { LoginForm } from 'components/Forms/LoginForm';
import { User } from 'types';
import { withPublicRoute } from 'hocs/withPublicRoute';
import { useRouter } from 'next/router';
import OAuthButtonsSection from 'components/Sections/OAuthButtonsSection';
import { Box } from '@mui/material';

const Login = () => {
  const router = useRouter();

  async function handleSubmit(credentials: User.LoginInput) {
    try {
      await Auth.signIn(credentials.email, credentials.password);
      router.push('/');
    } catch (error) {
      console.log({ error });
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
    </AuthenticationLayout>
  );
};

export default withPublicRoute(Login);
