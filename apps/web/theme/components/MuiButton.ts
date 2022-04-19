import { Components } from "@mui/material/styles";

const MuiButton: Components["MuiButton"] = {
  defaultProps: {
    variant: "contained",
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      borderRadius: "1rem",
      textTransform: "initial",
      paddingTop: "1rem",
      paddingBottom: "1rem",
    },
  },
};

export { MuiButton };
