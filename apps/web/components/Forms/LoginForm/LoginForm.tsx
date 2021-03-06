import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { User } from 'types';
import { TextFieldController } from 'components/Controllers/TextFieldController';
import { AuthenticationSection } from 'components/Sections/AuthenticationSection';

type LoginFormProps = {
  onSubmit: (credentials: User.LoginInput) => void;
};

const schema = yup.object().shape({
  email: yup.string().email().required('This field is required'),
  password: yup.string().min(8).required('This field is required'),
});

const LoginForm = (props: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<User.LoginInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <AuthenticationSection
        title="Sign in."
        description={
          <span>
            Remember to confirm your account before logging-in!
            <br />
            Need to create account? <Link href="/register">Sign up here.</Link>
          </span>
        }
        disableBottomMargin
      >
        <TextFieldController
          name="email"
          type="email"
          label="Email"
          error={errors?.email}
          control={control}
        />

        <TextFieldController
          name="password"
          type="password"
          label="Password"
          error={errors?.password}
          control={control}
        />

        <Box>
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isSubmitting}
          >
            Continue
          </LoadingButton>

          <Typography
            fontSize="1.2rem"
            color="primary.main"
            fontFamily="'Basier Circle', sans-serif"
            textAlign="center"
            marginTop="1rem"
          >
            Forgot your password?{' '}
            <Link href="/forgot-password">Click here</Link> to reset it.
          </Typography>
        </Box>
      </AuthenticationSection>
    </form>
  );
};

export { LoginForm };
