import styled from "@emotion/styled";
import { alpha } from "@mui/material/styles";
import { IconButton as MuiIconButton } from "@mui/material";

export const MovieCardWrapper = styled.div`
  position: relative;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;
  position: absolute;
  border-radius: 1rem;
`;

export const EditIconButton = styled(MuiIconButton)`
  z-index: 10;
  position: absolute;
  right: 6rem;
  top: 1rem;

  transition: all 0.2s linear 0s;
  background: ${({ theme }) => alpha(theme.palette.primary.light, 0.6)};

  > svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.palette.system.main};
    transition: all 0.2s linear 0s;
  }

  &:hover {
    background: ${({ theme }) => alpha(theme.palette.primary.light, 1)};
    transition: all 0.2s linear 0s;

    & > svg {
      fill: ${({ theme }) => theme.palette.info.light};
    }
  }
`;


export const DeleteIconButton = styled(MuiIconButton)`
  z-index: 10;
  position: absolute;
  right: 1rem;
  top: 1rem;

  transition: all 0.2s linear 0s;
  background: ${({ theme }) => alpha(theme.palette.primary.light, 0.6)};

  > svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.palette.system.main};
    transition: all 0.2s linear 0s;
  }

  &:hover {
    background: ${({ theme }) => alpha(theme.palette.primary.light, 1)};
    transition: all 0.2s linear 0s;

    & > svg {
      fill: ${({ theme }) => theme.palette.error.light};
    }
  }
`;
