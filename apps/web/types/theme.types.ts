import { Components, Theme } from '@mui/material/styles';
import {
  PaletteOptions,
  SimplePaletteColorOptions,
} from '@mui/material/styles/createPalette';

export type CustomThemeColors = PaletteOptions & {
  common: {
    white: string;
    black: string;
    transparent: string;
  };
  primary: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  danger: SimplePaletteColorOptions;
  tertiary: SimplePaletteColorOptions;
  background: SimplePaletteColorOptions;
  system: SimplePaletteColorOptions;
  category: {
    action: string;
    adventure: string;
    animation: string;
    comedy: string;
    crime: string;
    documentary: string;
    drama: string;
    family: string;
    fantasy: string;
    history: string;
    horror: string;
    music: string;
    mystery: string;
    romance: string;
    'science fiction': string;
    'tv movie': string;
    thriller: string;
    war: string;
    western: string;
  };
};

export type CustomTheme = Theme & {
  palette: CustomThemeColors;
  components: Components;
};
