import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { alpha } from '@mui/material/styles';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${(props) =>
    alpha(props.theme.palette.secondary.main, 0.1)};
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

export const Cover = styled.img``;

export const Content = styled.div`
  padding: 2rem 2rem 0.5rem 2rem;
  position: absolute;
  bottom: 0;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    ${(props) => alpha(props.theme.palette.background.main, 0.7)} 50%
  );

  width: 100%;
`;

export const EllipsedTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.8;
`;

export const StarIcon = styled(StarPurple500Icon)`
  color: ${(props) => props.theme.palette.system.main};
  font-size: 1.4rem;
  margin-right: 0.4em;
`;
