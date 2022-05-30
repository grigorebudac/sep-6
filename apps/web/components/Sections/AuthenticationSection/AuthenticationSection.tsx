import React from "react";
import { Stack, Typography } from "@mui/material";

type AuthenticationSectionProps = {
  title: string | JSX.Element;
  description: string | JSX.Element;
  disableBottomMargin?: boolean;
};

const AuthenticationSection: React.FC<AuthenticationSectionProps> = (props) => {
  return (
    <div>
      <Typography fontSize="3.2rem" color="primary.main" fontWeight="500">
        {props.title}
      </Typography>

      <Typography
        fontSize="1.4rem"
        color="primary.main"
        fontWeight="400"
        marginTop="1rem"
      >
        {props.description}
      </Typography>

      <Stack
        marginTop="4rem"
        marginBottom={props.disableBottomMargin ? "0rem" : "3rem"}
        spacing="4rem"
      >
        {props.children}
      </Stack>
    </div>
  );
};

export { AuthenticationSection };
