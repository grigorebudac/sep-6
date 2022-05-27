import styled from "@emotion/styled";
import { alpha, Dialog as MuiDialog, Button as MuiButton, IconButton as MuiIconButton } from "@mui/material";


export const Dialog = styled(MuiDialog)`
  z-index: 10200;
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

export const AddToPlayListBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  transform: translateY(-50%);
  margin-bottom: -5rem;
`;

export const IconButtonWrapper = styled(MuiIconButton)`
  box-shadow: 0px 0px 10px 3px ${({ theme }) => alpha(theme.palette.danger.main, 0.55)};
  min-width: 0;
  margin-right: 1rem;
  padding: 1rem;
  transition: all 0.2s linear 0s;
  background:  ${({ theme }) => theme.palette.danger.main};

  > svg {
    fill: ${({ theme }) => theme.palette.system.main};
    transition: all 0.2s linear 0s;
  }

  &:hover {
    background: ${({ theme }) => theme.palette.danger.dark!};
    transition: all 0.2s linear 0s;

    & > svg {
      fill: ${({ theme }) => theme.palette.system.main};
    }
  }
`;