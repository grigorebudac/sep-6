import React from 'react';
import { Auth } from '@aws-amplify/auth';
import { AuthenticationLayout } from 'components/Layouts/AuthenticationLayout';
import { RegisterForm } from 'components/Forms/RegisterForm';
import { User } from 'types';
import { withPublicRoute } from 'hocs/withPublicRoute';
import { useRouter } from 'next/router';

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

  return (
    <AuthenticationLayout title="Register">
      <RegisterForm onSubmit={handleSubmit} />
    </AuthenticationLayout>
  );
};

export default withPublicRoute(Register);
