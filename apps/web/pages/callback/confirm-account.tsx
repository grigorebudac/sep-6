import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@aws-amplify/auth';
import { Typography } from '@mui/material';

const ConfirmAccount = () => {
  const { query, isReady } = useRouter();

  const handleVerifyAccount = useCallback(async () => {
    const { code, username } = query;

    if (code == null || username == null) {
      alert('invalid url');
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

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        fontSize="3rem"
        fontWeight="bold"
        whiteSpace="pre-line"
        align="center"
      >
        {isReady
          ? 'Congratulation 🎉, \n Your account was successfully confirmed! '
          : 'Loading...'}
      </Typography>

      {isReady && (
        <a
          href="/login"
          style={{
            marginTop: 30,
            color: 'white',
            backgroundColor: '#FF6600',
            padding: '10px 20px',
            borderRadius: 5,
            fontWeight: 'bold',
          }}
        >
          Go to login page
        </a>
      )}
    </div>
  );
};

export default ConfirmAccount;
