import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const OAuthButton = styled(Button)`
  background-color: transparent;
  color: black;
  border: 1px solid #577a7d;

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ecf7ff;
    border: 1px solid #ecffff;
  }
`;
