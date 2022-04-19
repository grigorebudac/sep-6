import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
  Theme,
} from "@mui/material";

import { theme } from "../theme";

type ThemeContainerProps = {
  theme?: Theme;
};

const ThemeContainer: React.FC<ThemeContainerProps> = (props) => {
  return (
    <MuiThemeProvider theme={props.theme ?? theme}>
      <CssBaseline />

      {props.children}
    </MuiThemeProvider>
  );
};

export { ThemeContainer };
