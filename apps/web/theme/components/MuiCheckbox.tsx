import { Components } from "@mui/material/styles";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import palette from "../palette";

const MuiCheckbox: Components["MuiCheckbox"] = {
  defaultProps: {
    icon: <RadioButtonUncheckedIcon />,
    checkedIcon: <RadioButtonCheckedIcon />,
  },
  styleOverrides: {
    root: {
      "&.MuiCheckbox-root": {
        color: palette.primary.main,
      },
    },
  },
};

export { MuiCheckbox };
