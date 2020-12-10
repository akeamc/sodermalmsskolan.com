import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import { HTMLElementProps } from "../../styles/overrides";
import { fonts } from "../../styles/text";

export type ParagraphProps = HTMLElementProps<HTMLParagraphElement>;

export type Paragraph = FunctionComponent<ParagraphProps>;

export const SmallParagraph: Paragraph = (props) => (
  <p
    css={(theme: Theme) => ({
      color: theme.color.text.tertiary,
      fontSize: "0.875rem",
      margin: 0,
    })}
    {...props}
  />
);

export const CardDescription: Paragraph = (props) => (
  <p
    css={(theme: Theme) => ({
      color: theme.color.text.primary,
      fontSize: "1rem",
      margin: "1rem 0 0",
      lineHeight: 1.75,
      fontFamily: fonts.sans,
    })}
    {...props}
  />
);
