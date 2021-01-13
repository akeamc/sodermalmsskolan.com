import React, { ComponentType, FunctionComponent } from "react";
import { AlertCircle, AlertTriangle, CheckCircle } from "react-feather";
import { HTMLElementProps } from "../../styles/overrides";
import { fonts } from "../../styles/text";

export type ParagraphProps = HTMLElementProps<HTMLParagraphElement>;

export type Paragraph = FunctionComponent<ParagraphProps>;

export const SmallParagraph: Paragraph = (props) => (
  <p
    css={{
      color: "var(--color-text-tertiary)",
      fontSize: "0.875rem",
      margin: 0,
    }}
    {...props}
  />
);

export const CardDescription: Paragraph = (props) => (
  <p
    css={{
      color: "var(--color-text-primary)",
      fontSize: "1rem",
      margin: "1rem 0 0",
      lineHeight: 1.75,
      fontFamily: fonts.sans,
    }}
    {...props}
  />
);

/**
 * Paragraph with an informative icon.
 *
 * @param {any} props Props.
 *
 * @returns {React.ReactElement} The rendered paragraph.
 */
export const IconParagraph: FunctionComponent<ParagraphProps & {
  Icon: ComponentType,
}> = ({ Icon, children, ...props }) => (
  <div
    css={{
      display: "flex",
      margin: "1em 0",
      position: "relative",
      lineHeight: 1.25,
      "--icon-size": "1.5rem",

      "&::after": {
        "--border-width": "2px",
        content: "\"\"",
        position: "absolute",
        width: "var(--border-width)",
        backgroundColor: "currentColor",
        bottom: 0,
        top: "calc(var(--icon-size) + 0.5rem)",
        left: "calc((var(--icon-size) - var(--border-width)) / 2)",
      },
    }}
    {...props}
  >
    <Icon css={{
      marginRight: "0.25rem",
      flex: "0 0 var(--icon-size)",
      height: "var(--icon-size)",
    }}
    />
    <p css={{
      margin: "0.125rem 0",
      fontSize: "1rem",
      fontFamily: fonts.sans,

      a: {
        color: "inherit",
        fontWeight: 500,
      },
    }}
    >
      {children}
    </p>
  </div>
);

export const DangerParagraph: Paragraph = (props) => (
  <IconParagraph
    Icon={AlertCircle}
    css={{
      color: "var(--color-text-danger)",
    }}
    {...props}
  />
);

export const WarningParagraph: Paragraph = (props) => (
  <IconParagraph
    Icon={AlertTriangle}
    css={{
      color: "var(--color-text-warning)",
    }}
    {...props}
  />
);

export const SuccessParagraph: Paragraph = (props) => (
  <IconParagraph
    Icon={CheckCircle}
    css={{
      color: "var(--color-text-success)",
    }}
    {...props}
  />
);
