import styled from "@emotion/styled";
import { alpha } from "@mui/material";

export const Container = styled.div`
  width: 100vw;
  height: 100%;
  margin: auto;
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
`;

export const SectionContent = styled.div`
  margin: auto;
  width: 100%;
  max-width: 500px;
  transition: height 0.5s linear;
`;

export const FormSectionContent = styled(SectionContent)`
  display: flex;
  flex-direction: column;
  max-width: 70rem;
  margin-left: 0px;
  border-radius: 2rem;
  overflow: hidden;
  background: white;
  box-sizing: border-box;
  padding: 4rem;
`;

export const BackgroundContent = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  > iframe {
    width: 100vw;
    height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
    min-height: 100vh;
    min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;

export const Overlay = styled.div`
  background-color: ${({ theme }) => alpha(theme.palette.primary.main, 0.6)}
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
`;
