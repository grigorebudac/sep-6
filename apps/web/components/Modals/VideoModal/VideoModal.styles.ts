import styled from '@emotion/styled';
import { alpha, Dialog as MuiDialog } from '@mui/material';

export const Dialog = styled(MuiDialog)`
  z-index: 10111;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ContentContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.palette.common.black};
`;

export const CloseBtnContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  padding: 2rem;
  color: ${(props) => alpha(props.theme.palette.system.main, 0.4)};
  transition: color 0.2s linear;

  &:hover {
    color: ${(props) => alpha(props.theme.palette.system.main, 0.7)};
    transition: color 0.2s linear;
  }
`;
