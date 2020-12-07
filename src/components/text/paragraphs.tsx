import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import { HTMLElementProps } from "../../styles/overrides";

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
