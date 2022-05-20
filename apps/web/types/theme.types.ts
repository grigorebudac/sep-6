import { Components, Theme } from "@mui/material/styles";
import {
  PaletteOptions,
  SimplePaletteColorOptions,
} from "@mui/material/styles/createPalette";

export type CustomThemeColors = PaletteOptions & {
  common: {
    white: string;
    black: string;
    transparent: string;
  };
  primary: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  background: SimplePaletteColorOptions;
  system: SimplePaletteColorOptions;
};

export type CustomTheme = Theme & {
  palette: CustomThemeColors;
  components: Components;
};
