import styled from '@emotion/styled';

export const Main = styled.div`
  position: relative;
`;

export const MovieList = styled.div`
  width: 100%;
  display: -webkit-inline-box;
  overflow: hidden;
  grid-gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;

  @media (max-width: 500px) {
    width: 90%;
    padding: 20px 20px 0px 20px;
    grid-gap: 40px;
    margin-bottom: 50px;
  }
`;

export const Movie = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 5rem);
  border-radius: 1rem;
  background: ${(props) => props.theme.palette.background.main};
  overflow: hidden;
`;

export const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MovieContent = styled.div`
  max-width: 700px;
  padding-right: 10rem;
  padding-top: 15rem;
`;

export const MovieImageContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

export const MovieImage = styled.div`
  width: 35rem;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const Button = styled.button<{ active?: boolean }>`
  border-radius: 1rem;
  background: ${({ theme, active }) =>
    active ? theme.palette.common.white : 'transparent'};
  border: 2px solid ${(props) => props.theme.palette.common.white};
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-right: 1rem;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ScrollButton = styled.div<{ left?: boolean }>`
  position: absolute;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  top: calc(50% - 4rem);
  ${({ left }) => (left ? `left: -2rem;` : `right: -2rem;`)}
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fef9ef;
  z-index: 10;

  @media (max-width: 500px) {
    display: none;
  }
`;
