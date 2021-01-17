/* eslint-disable jsx-a11y/anchor-has-content */
import React, { FunctionComponent } from "react";
import Link from "next/link";
import { css, CSSObject, SerializedStyles } from "@emotion/react";
import { fonts } from "../../styles/text";

export type ButtonSize = "medium" | "small";

export interface ButtonProps {
  /**
   * Whether or not the button is primary.
   */
  primary?: boolean;
  href?: string;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset",
}

const disabledSelector = "&:disabled, &[disabled]";

/**
 * Base styles of a button. Not to be used on its own.
 *
 * @param {ButtonSize} size The desired size of the button.
 *
 * @returns {SerializedStyles} Styles.
 */
const baseStyles = (size: ButtonSize): SerializedStyles => {
  let paddingX: string;
  let paddingY: string;

  // eslint-disable-next-line default-case
  switch (size) {
    case "medium": {
      paddingX = "1.5rem";
      paddingY = "1rem";
      break;
    }

    case "small": {
      paddingX = "1rem";
      paddingY = "0.75rem";
      break;
    }
  }

  return css({
    color: "var(--color-text-primary)",
    backgroundColor: "transparent",
    display: "inline-block",
    border: "none",
    outline: "none",
    fontFamily: fonts.sans,
    fontWeight: 600,
    fontSize: "1rem",
    whiteSpace: "nowrap",
    borderRadius: "0.375rem",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.1s",
    padding: `${paddingY} ${paddingX}`,
    lineHeight: 1,

    [disabledSelector]: {
      boxShadow: "inset 0 0 0 1px var(--accents-2)",
      color: "transparent",
      pointerEvents: "none",
    },
  });
};

const primaryStyles = css({
  backgroundColor: "var(--color-highlight)",
  backgroundImage: "linear-gradient(180deg, var(--color-highlight-light), var(--color-highlight))",
  color: "#ffffff",

  "&:hover": {
    opacity: 0.75,
  },

  [disabledSelector]: {
    background: "var(--accents-1)",
  },
});

const secondaryStyles = css({
  boxShadow: "inset 0 0 0 1px var(--color-text-secondary)",
  transition: "box-shadow 0.2s ease",

  "&:hover": {
    boxShadow: "inset 0 0 0 2px var(--color-text-primary)",
  },
});

/**
 * A button with a link. Neat, right?
 *
 * @param {React.PropsWithChildren<ButtonProps>} props Button props.
 * @param {string} props.href Optional `href`.
 * @param {boolean} props.primary Is the button primary?
 * @param {ButtonSize} props.size Size of the button.
 * @param {boolean} props.disabled Is the button clickable?
 *
 * @returns {React.ReactElement} The rendered button.
 */
const Button: FunctionComponent<ButtonProps> = ({
  href,
  primary = false,
  size = "medium",
  disabled = false,
  ...rest
}) => {
  const styles: (SerializedStyles | CSSObject)[] = [
    baseStyles(size),
    primary ? primaryStyles : secondaryStyles,
  ];

  const innerProps = {
    css: styles,
    disabled,
    ...rest,
  };

  if (href) {
    return (
      <Link href={href} passHref>
        <a {...innerProps} />
      </Link>
    );
  }
  // eslint-disable-next-line react/button-has-type
  return <button {...innerProps} />;
};

export default Button;
