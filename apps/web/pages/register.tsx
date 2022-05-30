import React from 'react';
import { Auth, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { AuthenticationLayout } from 'components/Layouts/AuthenticationLayout';
import { RegisterForm } from 'components/Forms/RegisterForm';
import { User } from 'types';
import { withPublicRoute } from 'hocs/withPublicRoute';
import { useRouter } from 'next/router';
import OAuthButtonsSection from 'components/Sections/OAuthButtonsSection';
import { Box } from '@mui/material';

const Register = () => {
  const router = useRouter();

  async function handleSubmit(credentials: User.RegisterInput) {
    try {
      await Auth.signUp({
        username: credentials.email,
        password: credentials.password,
        attributes: {
          name: credentials.name,
          picture: '',
        },
      });

      router.push('/login');
    } catch (error) {
      console.log({ error });
    }
  }

  function handleSignInWithProvider(provider: CognitoHostedUIIdentityProvider) {
    Auth.federatedSignIn({ provider });
  }

  return (
    <AuthenticationLayout title="Register">
      <RegisterForm onSubmit={handleSubmit} />

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

export default withPublicRoute(Register);
