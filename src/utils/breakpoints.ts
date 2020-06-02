import styles from "../styles/_breakpoints.scss";

interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  desktopLarge: number;
  desktopExtraLarge: number;
}

function getBreakpoint(name: string): number {
  return parseInt(styles[name]);
}

export function getBreakpoints(): Breakpoints {
  return {
    mobile: getBreakpoint("mobile"),
    tablet: getBreakpoint("tablet"),
    desktop: getBreakpoint("desktop"),
    desktopLarge: getBreakpoint("desktopLarge"),
    desktopExtraLarge: getBreakpoint("desktopExtraLarge"),
  };
}
