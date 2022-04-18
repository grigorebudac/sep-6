import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "@aws-amplify/auth";

const ConfirmAccount = () => {
  const { query, isReady } = useRouter();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    handleVerifyAccount();
  }, [isReady]);

  async function handleVerifyAccount() {
    const { code, username } = query;

    if (code == null || username == null) {
      alert("invalid url");
      return;
    }

    try {
      const res = await Auth.confirmSignUp(username as string, code as string);
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  }

  return <p>Loading...</p>;
};

export default ConfirmAccount;
