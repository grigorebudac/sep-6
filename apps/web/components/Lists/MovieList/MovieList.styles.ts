import styled from '@emotion/styled';

export const Main = styled.div`
  position: relative;
`;

export const MovieList = styled.div`
  width: 100%;
  display: -webkit-inline-box;
  overflow: hidden;
  grid-gap: 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;

  @media (max-width: 500px) {
    width: 90%;
    padding: 20px 20px 0px 20px;
    grid-gap: 40px;
    margin-bottom: 50px;
  }
`;

export const MovieCardWrapper = styled.div`
  max-width: 15rem;
  max-height: 30rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

export const ScrollButton = styled.div<{ left?: boolean }>`
  position: absolute;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  top: calc(50% - 4rem);
  ${({ left }) => (left ? `left: -4rem;` : `right: -4rem;`)}
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 500px) {
    display: none;
  }
`;
