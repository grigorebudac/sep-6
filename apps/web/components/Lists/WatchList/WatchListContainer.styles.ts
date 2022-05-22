import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Grid, IconButton as MuiIconButton } from "@mui/material";

export const WatchListWrapper = styled.div`
  padding-bottom: 4rem;
`;

export const WatchListHeader = styled(Typography)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1rem;
  gap: 0.5rem;
`;

export const MovieList = styled(Grid)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  div {
    width: 20vh;
    max-width: 20vh;
  }

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  ::-webkit-scrollbar {
    display: none;
  }
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

export const MovieWrapper = styled.div`
  position: relative;

  `;