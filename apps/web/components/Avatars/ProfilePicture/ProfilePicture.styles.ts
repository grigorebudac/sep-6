import styled from "@emotion/styled";
import { Avatar as MuiAvatar } from "@mui/material";

export const Container = styled.div<{ showBorder: boolean }>`
  border-radius: 50%;
  padding: 0.2rem;
  border: 0.2rem solid
    ${({ theme, showBorder }) =>
      showBorder ? theme.palette.secondary.main : "transparent"};
`;

export const Avatar = styled(MuiAvatar)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;
