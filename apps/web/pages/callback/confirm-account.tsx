import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "@aws-amplify/auth";

const ConfirmAccount = () => {
  const { query, isReady } = useRouter();

  const handleVerifyAccount = useCallback(async () => {
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
  }, [query]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    handleVerifyAccount();
  }, [isReady, handleVerifyAccount]);

  return <p>Loading...</p>;
};

export default ConfirmAccount;
