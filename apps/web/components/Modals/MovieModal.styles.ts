import styled from "@emotion/styled";

export const CoverContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40rem;
  overflow: hidden;
`;

export const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0% 10%;
`;

export const CoverOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.palette.common.black};
  opacity: 0.7;
`;

export const CoverContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 2rem;
`;

export const Content = styled.div`
  padding: 2rem;
`;

export const Section = styled.div`
  margin-bottom: 2rem;
`;
