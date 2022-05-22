import styled from "@emotion/styled";
import { alpha, Dialog as MuiDialog } from "@mui/material";

export const Dialog = styled(MuiDialog)`
  z-index: 9999;
`;

export const CoverContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40rem;
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

export const CloseBtnContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  padding: 2rem;
  color: ${(props) => alpha(props.theme.palette.system.main, 0.4)};
  transition: color 0.2s linear;

  &:hover {
    color: ${(props) => alpha(props.theme.palette.system.main, 0.7)};
    transition: color 0.2s linear;
  }
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

export const ChartContainer = styled.div`
  width: 100%;
  height: 40rem;
  margin-bottom: 4rem;

  ${(props) => props.theme.breakpoints.down("sm")} {
    height: 20rem;
  }
`;
