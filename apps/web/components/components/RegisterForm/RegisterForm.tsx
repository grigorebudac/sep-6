import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { User } from "types";
import { TextFieldController } from "components/Controllers/TextFieldController";
import { AuthenticationSection } from "components/Sections/AuthenticationSection";

type RegisterFormProps = {
  onSubmit: (credentials: User.RegisterInput) => void;
};

const schema = yup.object().shape({
  email: yup.string().email().required("This field is required"),
  password: yup.string().min(8).required("This field is required"),
});

const RegisterForm = (props: RegisterFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<User.RegisterInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <AuthenticationSection
        title="Register"
        description={
          <span>
            Already have an account? <Link href="/login">Log in here.</Link>
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
        </Box>
      </AuthenticationSection>
    </form>
  );
};

export { RegisterForm };
