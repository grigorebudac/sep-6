import styled from "@emotion/styled";
// import { WIDTH_COLLAPSED } from "components/Sidebars/PrimarySidebar/PrimarySidebar.styles";

const WIDTH_COLLAPSED = 90;

export const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.main};
`;

export const NavMenu = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  order: 1;
  display: flex;
  flex-direction: row;
  transition: all 0.2s linear 0s;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-right: ${WIDTH_COLLAPSED}px;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  order: 2;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  transition: all 0.2s linear 0s;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

export const EventSidebarContainer = styled.div`
  position: relative;
`;

export const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PageContent = styled.div`
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  overflow: hidden scroll;
  padding: 0rem 2rem 10rem 2rem;
`;
