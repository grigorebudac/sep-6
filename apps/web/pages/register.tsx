import React from "react";
import { Auth } from "@aws-amplify/auth";
import { AuthenticationLayout } from "components/Layouts/AuthenticationLayout";
import { RegisterForm } from "components/Forms/RegisterForm";
import { User } from "types";

const Register = () => {
  async function handleSubmit(credentials: User.RegisterInput) {
    try {
      const res = await Auth.signUp({
        username: credentials.email,
        password: credentials.password,
        attributes: {
          name: credentials.name,
          picture: "",
        },
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
