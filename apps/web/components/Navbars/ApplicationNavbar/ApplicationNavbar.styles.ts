import styled from "@emotion/styled";
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  IconButton as MuiIconButton,
  alpha,
} from "@mui/material";

export const AppBar = styled(MuiAppBar)`
  background-color: ${({ theme }) => theme.palette.background.main};
`;

export const Toolbar = styled(MuiToolbar)`
  display: flex;
  justify-content: space-between;
`;

export const IconButton = styled(MuiIconButton)`
  transition: all 0.2s linear 0s;
  background: ${({ theme }) => alpha(theme.palette.system.main, 0)};

  > svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.palette.secondary.main};
    transition: all 0.2s linear 0s;
  }

  &:hover {
    background: ${({ theme }) => alpha(theme.palette.system.main, 0.1)};
    transition: all 0.2s linear 0s;

    & > svg {
      fill: ${({ theme }) => theme.palette.system.main};
    }
  }
`;
