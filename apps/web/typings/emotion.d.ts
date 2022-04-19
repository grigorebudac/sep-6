/// <reference types="@emotion/react/types/css-prop" />

import { CustomTheme } from "types";

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
