import styled from "@emotion/styled";
import { DRAWER } from "config/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div<{ drawerWidth: number }>`
  display: flex;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0rem 2rem 0rem 2rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: ${`calc(100% - ${DRAWER.WIDTH_COLLAPSED}px)`};
  margin-left: ${DRAWER.WIDTH_COLLAPSED}px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: ${(props) => `calc(100% - ${props.drawerWidth}px)`};
    margin-left: ${(props) => props.drawerWidth}px;
  }
`;

export const Main = styled.main`
  width: 100%;
  padding-bottom: 10rem;
`;

export const Panel = styled.div`
  width: 40%;

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 0rem;
  }
`;

export const EventSidebarContainer = styled.div<{ drawerWidth: number }>`
  & .MuiPaper-root {
    margin-left: ${(props) => props.drawerWidth}px;
  }
`;
