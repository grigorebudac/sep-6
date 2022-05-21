import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${(props) =>
    alpha(props.theme.palette.secondary.main, 0.1)};
  border-radius: 1rem;
  overflow: hidden;
`;

export const Cover = styled.img``;

export const Content = styled.div`
  padding: 2rem;
`;

export const EllipsedTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
