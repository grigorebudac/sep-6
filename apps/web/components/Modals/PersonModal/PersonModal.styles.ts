import styled from '@emotion/styled';
import { alpha, Dialog as MuiDialog } from '@mui/material';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';

export const Dialog = styled(MuiDialog)`
  z-index: 10111;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ContentContainer = styled.div`
  position: relative;
`;

export const Cover = styled.div`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  background-color: ${(props) => props.theme.palette.secondary.main};
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0 5rem;
`;

export const Avatar = styled.img`
  width: 20rem;
  height: 20rem;
  object-fit: cover;
  border: 0.3rem solid ${(props) => props.theme.palette.background.main};
  background-color: ${(props) => props.theme.palette.background.main};
  border-radius: 50%;
  position: absolute;
  bottom: -10rem;
  left: 5rem;
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

export const Content = styled.div`
  padding: 5rem;
  background: ${(props) => props.theme.palette.background.main};
  color: ${(props) => props.theme.palette.common.white};
  width: 100%;
`;

export const StarIcon = styled(StarPurple500Icon)`
  font-size: 4rem;
  margin-right: 0.2em;
`;
