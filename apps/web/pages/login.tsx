import React from "react";
import { Auth } from "@aws-amplify/auth";

const Login = () => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await Auth.signIn(email, password);

      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" name="email" />
        <input placeholder="Password" type="password" name="password" />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
