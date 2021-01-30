export type Font = "sans" | "serif" | "monospace";

export interface Fonts<T = string> extends Record<Font, T> {
  sans: T;
  serif: T;
  monospace: T;
}

export const fallback: Fonts = {
  sans: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", Helvetica, sans-serif",
  serif: "serif",
  monospace: "monospace",
};

export const fonts: Fonts = {
  sans: `Inter, ${fallback.sans}`,
  serif: fallback.serif,
  monospace: `IBM Plex Mono, ${fallback.monospace}`,
};
