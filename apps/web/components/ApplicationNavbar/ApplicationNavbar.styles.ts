import styled from "@emotion/styled";
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  IconButton as MuiIconButton,
  alpha,
} from "@mui/material";

export const AppBar = styled(MuiAppBar)`
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export const Toolbar = styled(MuiToolbar)`
  display: flex;
  justify-content: flex-end;
`;

export const IconButton = styled(MuiIconButton)`
  transition: all 0.2s linear 0s;
  background: ${({ theme }) => alpha(theme.palette.primary.main, 0)};

  > svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.palette.secondary.main};
    transition: all 0.2s linear 0s;
  }

  &:hover {
    background: ${({ theme }) => alpha(theme.palette.primary.main, 0.1)};
    transition: all 0.2s linear 0s;

    & > svg {
      fill: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;
