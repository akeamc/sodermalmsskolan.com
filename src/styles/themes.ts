import { DefaultTheme } from "styled-components";

export interface SkeletonColors {
  base: string;
  highlight: string;
}

export interface InputColors {
  background: string;
}

export interface ToastColors {
  background: string;
  foreground: string;
}

export interface ColorPalette {
  background: string;
  foreground: string;
  primary: string;
  shadow: string;
  border: string;
  slightlyHighlighted: string;
  code: string;
  muted: string;
  skeleton: SkeletonColors;
  input: InputColors;
  toast: ToastColors;
  success: string;
  error: string;
}

export interface Shadows {
  navigation: string;
  small: string;
  medium: string;
  large: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorPalette;
    shadows: Shadows;
    dark: boolean;
  }
}

const defaultShadows = (color: string, navigationColor: string): Shadows => {
  return {
    navigation: `inset 0 -1px 0 0 ${navigationColor}`,
    small: `0 5px 10px ${color}`,
    medium: `0 8px 30px ${color}`,
    large: `0 30px 60px ${color}`,
  };
};

export const light: DefaultTheme = {
  colors: {
    background: "#ffffff",
    foreground: "#000000",
    primary: "#0070f3",
    shadow: "#333333",
    border: "#eaeaea",
    muted: "#666666",
    code: "rgba(27, 31, 35, 0.05)",
    slightlyHighlighted: "#fafafa",
    skeleton: {
      base: "#eaeaea",
      highlight: "#fafafa",
    },
    success: "#335eea",
    error: "#df4759",
    input: {
      background: "#f3f3f3",
    },
    toast: {
      background: "#222222",
      foreground: "#ffffff",
    },
  },
  shadows: defaultShadows("#eaeaea", "rgba(0, 0, 0, 0.1)"),
  dark: false,
};

export const dark: DefaultTheme = {
  ...light,
  colors: {
    ...light.colors,
    background: "#111111",
    foreground: "#ffffff",
    border: "#333333",
    shadow: "#333333",
    muted: "#888888",
    slightlyHighlighted: "#222222",
    skeleton: {
      base: "#333333",
      highlight: "#444444",
    },
    input: {
      background: "#222222",
    },
    toast: {
      background: "#fafafa",
      foreground: "#000000",
    },
  },
  shadows: defaultShadows(
    "rgba(255, 255, 255, 0.1)",
    "rgba(255, 255, 255, 0.1)"
  ),
  dark: true,
};

export const transparentLightPalette: ColorPalette = {
  ...light.colors,
  foreground: "#ffffff",
  muted: "rgba(255, 255, 255, 0.75)",
  border: "rgba(255, 255, 255, 0.9)",
  primary: "#ffffff",
};
