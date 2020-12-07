import { css, SerializedStyles, Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import { HTMLElementProps } from "../../styles/overrides";

export type SpanProps = HTMLElementProps<HTMLSpanElement>;

export type Span = FunctionComponent<SpanProps>;

export type ModifierFunction = (theme: Theme) => SerializedStyles;

export const accentColor: ModifierFunction = (theme) => css({
  color: theme.color.accent,
});

export const AccentText: Span = (props) => (
  <span css={accentColor} {...props} />
);
