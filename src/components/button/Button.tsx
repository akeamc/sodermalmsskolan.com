/* eslint-disable jsx-a11y/anchor-has-content */
import React, { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { css } from "@emotion/react";
import { fonts } from "../../styles/text";

export interface ButtonProps {
  children: ReactNode;

  /**
   * Whether or not the button is primary.
   */
  primary?: boolean;

  href?: string;
}

const baseStyles = css({
  color: "var(--color-text-primary)",
  backgroundColor: "transparent",
  display: "inline-block",
  border: "none",
  outline: "none",
  fontFamily: fonts.sans,
  fontWeight: 800,
  fontSize: "1rem",
  whiteSpace: "nowrap",
  borderRadius: "0.375rem",
  cursor: "pointer",
  textDecoration: "none",
  transition: "all 0.1s ease",
  padding: "1rem 1.5rem",
  lineHeight: 1,
});

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
 */
const Button: FunctionComponent<ButtonProps> = ({
  href,
  primary = false,
  ...rest
}) => {
  const styles = [
    baseStyles,
    primary ? primaryStyles : secondaryStyles,
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
