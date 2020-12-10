/* eslint-disable jsx-a11y/anchor-has-content */
import {
  css, SerializedStyles, Theme, useTheme,
} from "@emotion/react";
import Link from "next/link";
import React, { FunctionComponent, HTMLAttributes } from "react";

export const cardStyles = (theme: Theme, big = false): SerializedStyles => css({
  background: theme.card.background,
  borderRadius: "0.375rem",
  boxShadow: `inset 0 0 0 1px ${theme.color.border}`,
  padding: big ? "4rem 2rem" : "1rem",
  display: "flex",
  flexDirection: "column",
  color: "inherit",
  textDecoration: "none",
  transition: "all 0.1s",
  placeItems: big ? "center" : "unset",
  textAlign: big ? "center" : "unset",
});

export const cardLinkStyles = (theme: Theme): SerializedStyles => css({
  "&:hover": {
    boxShadow: `inset 0 0 0 1px ${theme.color.text.primary}`,
  },
});

export interface CardProps extends HTMLAttributes<HTMLOrSVGElement> {
  href?: string;
  big?: boolean;
}

const Card: FunctionComponent<CardProps> = ({ href, big, ...rest }) => {
  const theme = useTheme();

  const sharedStyles = cardStyles(theme, big);

  if (href) {
    return (
      <Link href={href} passHref>
        <a
          css={[sharedStyles, cardLinkStyles(theme)]}
          {...rest}
        />
      </Link>
    );
  }

  return <div css={sharedStyles} {...rest} />;
};

export default Card;
