import styled from "@emotion/styled";

export const Container = styled.section``;

export const TitleContainer = styled.div`
  width: 100%;
  position: sticky;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  z-index: 2;
  flex-shrink: 0;
  padding: 0px 2rem;
  padding-bottom: 2rem;
  background: ${({ theme }) => theme.palette.primary.main};
  top: 0rem;
`;
