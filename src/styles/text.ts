export interface Fonts extends Record<string, string> {
  sans: string;
  serif: string;
  monospace: string;
}

export const fallback: Fonts = {
  sans: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", Helvetica, sans-serif`,
  serif: "serif",
  monospace: "monospace",
};

export const fonts: Fonts = {
  sans: `Inter, ${fallback.sans}`,
  serif: fallback.serif,
  monospace: `IBM Plex Mono, ${fallback.monospace}`,
};
