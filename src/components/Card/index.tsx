/* eslint-disable jsx-a11y/anchor-has-content */
import {
  css, SerializedStyles, Theme, useTheme,
} from "@emotion/react";
import Link from "next/link";
import React, { FunctionComponent } from "react";

export const cardStyles = (theme: Theme): SerializedStyles => css({
  background: theme.card.background,
  borderRadius: "0.375rem",
  boxShadow: `inset 0 0 0 1px ${theme.color.border}`,
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  color: "inherit",
  textDecoration: "none",
  transition: "all 0.1s",
});

export const cardLinkStyles = (theme: Theme): SerializedStyles => css({
  "&:hover": {
    boxShadow: `inset 0 0 0 1px ${theme.color.text.primary}`,
  },
});

export interface CardProps {
  href?: string;
}

const Card: FunctionComponent<CardProps> = ({ href, ...rest }) => {
  const theme = useTheme();

  if (href) {
    return (
      <Link href={href} passHref>
        <a
          css={[cardStyles(theme), cardLinkStyles(theme)]}
          {...rest}
        />
      </Link>
    );
  }

  return <div css={cardStyles} {...rest} />;
};

export default Card;
