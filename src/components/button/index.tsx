import React, { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { fonts } from "../../styles/text";
import { lighten, linearGradient, transparentize } from "polished";
import { css, Theme, useTheme } from "@emotion/react";

export interface ButtonProps {
  children: ReactNode;

  /**
   * Whether or not the button is primary.
   */
  primary?: boolean;
}

export interface ButtonLinkProps extends ButtonProps {
  href: string;
}

const baseButtonStyles = (theme: Theme) =>
  css({
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
  });

/**
 * A button with a link. Neat, right?
 */
export const ButtonLink: FunctionComponent<ButtonLinkProps> = ({
  href,
  primary = false,
  children,
}) => {
  const innerProps: {
    as?: React.ElementType<unknown>;
    children: ReactNode;
  } = {
    as: "a",
    children,
  };

  const theme = useTheme();

  const base = baseButtonStyles(theme);

  const inner = primary ? (
    <button
      css={[
        base,
        {
          backgroundColor: theme.color.accent,
          backgroundImage: `linear-gradient(${lighten(
            0.1,
            theme.color.accent
          )}, ${theme.color.accent})`,
          color: theme.color.text.white,
          [`&:hover`]: {
            opacity: 0.75,
          },
        },
      ]}
      {...innerProps}
    />
  ) : (
    <button
      css={[
        base,
        {
          boxShadow: `inset 0 0 0 1px ${transparentize(
            0.5,
            theme.color.text.primary
          )}`,
          transition: "box-shadow 0.2s ease",
          [`&:hover`]: {
            boxShadow: `inset 0 0 0 2px ${theme.color.text.primary}`,
          },
        },
      ]}
      {...innerProps}
    />
  );

  return (
    <Link href={href} passHref>
      {inner}
    </Link>
  );
};
