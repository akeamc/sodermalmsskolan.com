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

const baseStyles = (size: ButtonSize) => {
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
  });
};

const primaryStyles = css({
  backgroundColor: "var(--color-highlight)",
  backgroundImage: "linear-gradient(var(--color-highlight-light), var(--color-highlight))",
  color: "#ffffff",

  "&:hover": {
    opacity: 0.75,
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
 * @param root0
 * @param root0.href
 * @param root0.primary
 * @param root0.size
 * @param root0.disabled
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
    disabled ? {
      opacity: 0.1,
      pointerEvents: "none",
      userSelect: "none",
    } : null,
  ];

  const innerProps = {
    css: styles,
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
