import styled, { CSSObject } from "@emotion/styled";
import { ScopeTicketsTheme } from "ui";

import {
  Drawer as MuiDrawer,
  ListItemText as MuiListItemText,
  ListItemIcon as MuiListItemIcon,
  ListItemButton as MuiListItemButton,
  Divider as MuiDivider,
  alpha,
  css,
} from "@mui/material";

export const WIDTH_EXPANDED = 240;
export const WIDTH_COLLAPSED = 90;

const openedMixin = (theme: ScopeTicketsTheme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: WIDTH_EXPANDED,
  overflowX: "hidden",
});

const closedMixin = (theme: ScopeTicketsTheme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: WIDTH_COLLAPSED,
  [theme.breakpoints.up("sm")]: {
    width: WIDTH_COLLAPSED,
  },
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: WIDTH_EXPANDED,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.main,
    border: "none",
    padding: "2rem",
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    zIndex: 2000,
  },
}));

export const ListItemText = styled(MuiListItemText)`
  font-size: 1.4rem;
  color: ${(props) => props.theme.palette.secondary.main};
  transition: all 0.2s linear 0s;
  white-space: nowrap;
  user-select: none;
  font-family: "Basier Circle", sans-serif;
  font-weight: 400;
`;

export const ListItemIcon = styled(MuiListItemIcon)`
  color: ${(props) => props.theme.palette.secondary.main};
  font-size: 2rem;

  & > svg {
    fill: ${(props) => props.theme.palette.secondary.main};
    width: 1em;
    height: 1em;
    transition: all 0.2s linear 0s;
  }
`;

const ListItemButtonActiveMixin = (theme: ScopeTicketsTheme) => css`
  color: ${theme.palette.system.main};

  ${ListItemIcon}, ${ListItemText} {
    color: ${theme.palette.system.main};

    > svg {
      fill: ${theme.palette.system.main};
    }
  }
`;

const ListItemButtonHoverMixin = (theme: ScopeTicketsTheme) => css`
  color: ${theme.palette.system.main};

  ${ListItemIcon}, ${ListItemText} {
    color: ${theme.palette.system.main};

    > svg {
      fill: ${theme.palette.system.main};
    }
  }
`;

export const ListItemButton = styled(MuiListItemButton)<{ isActive?: boolean }>`
  transition: color 0.2s linear;

  &:hover {
    ${(props) =>
      props.isActive
        ? ListItemButtonActiveMixin(props.theme)
        : ListItemButtonHoverMixin(props.theme)}
  }

  ${(props) => props.isActive && ListItemButtonActiveMixin(props.theme)}
`;

export const Divider = styled(MuiDivider)`
  border-color: ${(props) => alpha(props.theme.palette.primary.main, 0.1)};
  border-width: 0.1rem;
  margin: 2rem 0rem;
`;

export const BrokerContainer = styled.div`
  position: relative;
  border: 0.2rem solid ${(props) => props.theme.palette.primary.main};
  border-radius: 1rem;
  overflow: hidden;
  width: 4rem;
  height: 4rem;
  transition: all 0.2s linear;
  margin: 1rem 0rem;

  &:hover {
    border-color: ${(props) => props.theme.palette.system.main};
  }
`;

export const ActionsContainer = styled.div`
  margin-top: auto;
`;
