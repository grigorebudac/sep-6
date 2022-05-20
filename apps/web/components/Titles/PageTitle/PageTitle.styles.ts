import styled from "@emotion/styled";

export const Container = styled.div``;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.palette.primary.main};

  > svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.palette.primary.main};
  }

  > :first-of-type {
    margin-right: 2rem;
  }
`;
