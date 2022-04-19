import { Components } from "@mui/material/styles";

const MuiTypography: Components["MuiTypography"] = {
  styleOverrides: {
    h1: {
      fontSize: "4.2rem",
      fontFamily: ["Basier Circle", "sans-serif"].join(","),
    },
    h2: {
      fontSize: "1.6rem",
      fontFamily: ["Basier Circle", "sans-serif"].join(","),
    },
    h3: {
      fontSize: "1.4rem",
      fontFamily: ["Basier Square", "sans-serif"].join(","),
    },
    h4: {
      fontSize: "1.3rem",
      fontFamily: ["Basier Square", "sans-serif"].join(","),
    },
    h5: {
      fontSize: "1.4rem",
      fontFamily: ["Source Code Pro", "monospace"].join(","),
    },
    paragraph: {
      fontSize: "1.3rem",
      fontFamily: ["Basier Square", "sans-serif"].join(","),
      lineHeight: "1.5em",
      margin: 0,
    },
  },
};

export { MuiTypography };
