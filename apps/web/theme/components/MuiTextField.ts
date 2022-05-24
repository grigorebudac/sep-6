import { Components, alpha } from "@mui/material/styles";
import palette from "../palette";

const MuiTextField: Components["MuiTextField"] = {
  defaultProps: {
    InputLabelProps: {
      shrink: true,
    },
  },
  styleOverrides: {
    root: {
      "&:hover .MuiInputLabel-root": {
        color: alpha(palette.background.main, 1),
        transition: "color 0.2s linear",
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: palette.background.main,
      },

      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderWidth: "0.2rem",
          borderRadius: "0.5rem",
          borderColor: alpha(palette.background.main, 0.25),
          transition: "border 0.2s linear",
        },
        "&:hover fieldset": {
          borderColor: alpha(palette.background.main, 0.5),
          transition: "border 0.2s linear",
        },
        "&.Mui-focused fieldset": {
          borderColor: palette.background.main,
          transition: "border 0.2s linear",
        },
      },
    },
  },
};

export { MuiTextField };
