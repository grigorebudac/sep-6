import React from "react";
import { Auth } from "@aws-amplify/auth";
import { AuthenticationLayout } from "components/Layouts/AuthenticationLayout";
import { LoginForm } from "components/Forms/LoginForm";
import { User } from "types";

const Login = () => {
  async function handleSubmit(credentials: User.LoginInput) {
    try {
      const res = await Auth.signIn(credentials.email, credentials.password);

      console.log({ res });
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

export default Login;
