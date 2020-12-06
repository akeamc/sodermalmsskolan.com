import { Theme } from "@emotion/react";
import React, {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
} from "react";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";

export type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export type Heading = FunctionComponent<HeadingProps>;

export const HeroHeading: Heading = (props) => {
  return (
    <h1
      css={(theme: Theme) => ({
        fontSize: "3.5rem",
        fontWeight: 800,
        lineHeight: 0.96,
        margin: 0,
        letterSpacing: "-0.025em",
        color: theme.color.text.primary,

        [media(breakpoints.medium)]: {
          fontSize: "4.5rem",
        },
      })}
      {...props}
    />
  );
};

/**
 * A smaller, all-uppercase monospaced heading perfect for complementing a larger one.
 */
export const SmallHeading: Heading = (props) => (
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

export const SubTitle: Heading = (props) => (
  <h4
    css={(theme: Theme) => ({
      margin: 0,
      marginTop: "1rem",
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: "-0.025em",
      color: theme.color.text.secondary,
    })}
    {...props}
  />
);

export const H5: Heading = (props) => (
  <h5
    css={(theme: Theme) => ({
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.25,
      color: theme.color.text.tertiary,
      margin: 0,
    })}
    {...props}
  />
);
