import { getLuminance } from "polished";

export const defaultLightForeground = "#ffffff";
export const defaultDarkForeground = "#000000";

/**
 * Returns a *relatively* readable color, menaing it is not as aggressive as W3C wants it to be,
 * while still remaining relatively readable.
 *
 * @param {string} color The background color.
 * @param {string} colorIfLight Optional color to use for dark backgrounds.
 * @param {string} colorIfDark Optional color to use for light backgrounds.
 *
 * @returns {string} The readable foreground color.
 */
const relativelyReadableColor = (
  color: string,
  colorIfLight = defaultDarkForeground,
  colorIfDark = defaultLightForeground,
): string => {
  const isLight = getLuminance(color) > 0.4;

  return isLight ? colorIfLight : colorIfDark;
};

export default relativelyReadableColor;
