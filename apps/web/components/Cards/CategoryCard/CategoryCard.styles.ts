import { CustomThemeColors } from 'types/theme.types';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { darken } from '@mui/material/styles';

export type CategoryTitle = keyof CustomThemeColors['category'];

export const Container = styled.div<{ title: CategoryTitle }>`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme.palette.category?.[props.title] ||
    props.theme.palette.common.white};
  border-radius: 1rem;
  overflow: hidden;
`;

export const Content = styled.div`
  padding: 4rem;
`;

export const EllipsedTypography = styled(Typography) <{ title: CategoryTitle }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) =>
    darken(
      props.theme.palette.category?.[props.title] ||
      props.theme.palette.common.white,
      0.5,
    )};
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
`;

export const StarIcon = styled(Star)`
  color: ${(props) => props.theme.palette.system.main};
  font-size: 1.4rem;
  margin-right: 0.4em;
`;
