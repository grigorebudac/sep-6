import { Components } from "@mui/material/styles";
import palette from "../palette";

export const MuiCssBaseline: Components["MuiCssBaseline"] = {
  styleOverrides: {
    html: {
      fontSize: "62.5%",
    },
    "html, body, #root, #__next": {
      margin: 0,
      padding: 0,
    },
    a: {
      textDecoration: "none",
      transition: "color 0.2s linear",
      color: palette.secondary.main,
    },
  },
};
