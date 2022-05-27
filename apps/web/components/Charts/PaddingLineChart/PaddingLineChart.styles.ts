import { alpha } from '@mui/material/styles';
import styled from '@emotion/styled';

export const Tooltip = styled.div`
  background-color: ${(props) => alpha(props.theme.palette.tertiary.main, 0.1)};
  border: 1px solid ${(props) => props.theme.palette.common.white};
  color: ${(props) => props.theme.palette.common.black};
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0 2rem;

  p {
    color: ${(props) => props.theme.palette.common.white};
    padding: 0;
    margin: 0;
  }
`;
