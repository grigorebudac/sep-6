import styled from '@emotion/styled';
import {
  alpha,
  lighten,
  TextField as MuiTextField,
  Autocomplete as MuiAutocomplete,
} from '@mui/material';

export const Container = styled.div`
  width: 30rem;
  border-radius: 0.6rem;
  background-color: ${({ theme }) =>
    lighten(theme.palette.background.main, 0.1)};
`;

export const TextField = styled(MuiTextField)`
  .MuiInputBase-input {
    color: ${(props) => alpha(props.theme.palette.common.white, 0.8)};
  }

  .MuiButtonBase-root,
  .MuiCircularProgress-root {
    color: ${(props) => alpha(props.theme.palette.common.white, 0.5)};
  }
`;

export const Cover = styled.img`
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
  border-radius: 0.2em;
`;
