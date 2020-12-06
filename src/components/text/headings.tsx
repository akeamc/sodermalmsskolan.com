import { Theme } from "@emotion/react";
import React, {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
} from "react";
import { fonts } from "../../styles/text";

export type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const HeroHeading: FunctionComponent<HeadingProps> = (props) => {
  return (
    <h1
      css={(theme: Theme) => ({
        fontSize: "4rem",
        fontWeight: 700,
        lineHeight: 0.96,
        margin: 0,
        letterSpacing: "-0.025em",
        color: theme.color.text.primary,
      })}
      {...props}
    />
  );
};

/**
 * A smaller, all-uppercase monospaced heading perfect for complementing a larger one.
 */
export const SmallHeading: FunctionComponent<HeadingProps> = (props) => (
  <h4
    css={(theme: Theme) => ({
      fontFamily: fonts.monospace,
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.075rem",
      textTransform: "uppercase",
      color: theme.color.text.tertiary,
      margin: 0,
    })}
    {...props}
  />
);
