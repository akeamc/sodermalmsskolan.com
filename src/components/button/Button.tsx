import React, { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { lighten, transparentize } from "polished";
import { css, Theme, useTheme } from "@emotion/react";
import { fonts } from "../../styles/text";

export interface ButtonProps {
  children: ReactNode;

  /**
   * Whether or not the button is primary.
   */
  primary?: boolean;

  href?: string;
}

const baseStyles = (theme: Theme) => css({
  color: theme.color.text.primary,
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

const primaryStyles = (theme: Theme) => css({
  backgroundColor: theme.color.accent,
  backgroundImage: `linear-gradient(${lighten(0.1, theme.color.accent)}, ${
    theme.color.accent
  })`,
  color: theme.color.text.white,

  "&:hover": {
    opacity: 0.75,
  },
});

const secondaryStyles = (theme: Theme) => css({
  boxShadow: `inset 0 0 0 1px ${transparentize(
    0.5,
    theme.color.text.primary,
  )}`,
  transition: "box-shadow 0.2s ease",

  "&:hover": {
    boxShadow: `inset 0 0 0 2px ${theme.color.text.primary}`,
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
  const theme = useTheme();

  const css = [
    baseStyles(theme),
    primary ? primaryStyles(theme) : secondaryStyles(theme),
  ];

  const innerProps = {
    css,
    ...rest,
  };

  if (href) {
    return (
      <Link href={href} passHref>
        <a {...innerProps} />
      </Link>
    );
  }
  return <button {...innerProps} />;
};

export default Button;
