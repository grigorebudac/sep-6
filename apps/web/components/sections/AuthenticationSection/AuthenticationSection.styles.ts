import styled from "@emotion/styled";
import { alpha } from "@mui/material";

export const Container = styled.section``;

export const CurvesContainer = styled.div`
  position: sticky;
  width: 100%;
  height: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 2;

  > svg {
    height: 100%;
    fill: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const Content = styled.div`
  box-sizing: border-box;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => alpha(theme.palette.secondary.main, 0.1)};
`;
