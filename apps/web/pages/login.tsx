import React from 'react';
import { Auth } from '@aws-amplify/auth';
import { AuthenticationLayout } from 'components/Layouts/AuthenticationLayout';
import { LoginForm } from 'components/Forms/LoginForm';
import { User } from 'types';
import { withPublicRoute } from 'hocs/withPublicRoute';
import { useRouter } from 'next/router';

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

  return (
    <AuthenticationLayout title="Log in">
      <LoginForm onSubmit={handleSubmit} />
    </AuthenticationLayout>
  );
};

export default withPublicRoute(Login);
