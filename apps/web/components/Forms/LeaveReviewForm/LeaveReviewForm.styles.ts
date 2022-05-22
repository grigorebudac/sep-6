import styled from "@emotion/styled";
import { Button as MuiButton } from "@mui/material";

export const Button = styled(MuiButton)`
  background-color: ${(props) => props.theme.palette.background.main};
  color: ${(props) => props.theme.palette.common.white};
`;
