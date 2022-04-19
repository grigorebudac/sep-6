import React from "react";
import { Auth } from "@aws-amplify/auth";
import { AuthenticationLayout } from "components/Layouts/AuthenticationLayout";
import { RegisterForm } from "components/components/RegisterForm";
import { User } from "types";

const Register = () => {
  async function handleSubmit(credentials: User.RegisterInput) {
    try {
      const res = await Auth.signUp({
        username: credentials.email,
        password: credentials.password,
      });

      console.log({ res });
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

export default Register;
