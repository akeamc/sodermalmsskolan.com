import React, { ComponentType, FunctionComponent } from "react";
import { AlertCircle, AlertTriangle, CheckCircle } from "react-feather";
import { HTMLElementProps } from "../../styles/types/overrides";
import { fonts } from "../../styles/text";

export type ParagraphProps = HTMLElementProps<HTMLParagraphElement>;

export type Paragraph = FunctionComponent<ParagraphProps>;

/**
 * A small paragraph.
 *
 * @param {React.PropsWithChildren<ParagraphProps>} props The props.
 *
 * @returns {React.ReactElement} The rendered small paragraph.
 */
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

/**
 * Paragraph used as card descriptions.
 *
 * @param {React.PropsWithChildren<ParagraphProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered paragraph.
 */
export const CardDescription: Paragraph = (props) => (
  <div
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
  icon: ComponentType,
}> = ({ icon: Icon, children, ...props }) => (
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
      flex: 1,

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

/**
 * Paragraph used to indicate danger or errors.
 *
 * @param {React.PropsWithChildren<ParagraphProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered paragraph.
 */
export const DangerParagraph: Paragraph = (props) => (
  <IconParagraph
    icon={AlertCircle}
    css={{
      color: "var(--color-text-danger)",
    }}
    {...props}
  />
);

/**
 * Paragraph used to indicate warnings.
 *
 * @param {React.PropsWithChildren<ParagraphProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered paragraph.
 */
export const WarningParagraph: Paragraph = (props) => (
  <IconParagraph
    icon={AlertTriangle}
    css={{
      color: "var(--color-text-warning)",
    }}
    {...props}
  />
);

/**
 * Paragraph used to indicate success.
 *
 * @param {React.PropsWithChildren<ParagraphProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered paragraph.
 */
export const SuccessParagraph: Paragraph = (props) => (
  <IconParagraph
    icon={CheckCircle}
    css={{
      color: "var(--color-text-success)",
    }}
    {...props}
  />
);
