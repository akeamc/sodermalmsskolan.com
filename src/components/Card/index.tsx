/* eslint-disable jsx-a11y/anchor-has-content */
import {
  css, SerializedStyles,
} from "@emotion/react";
import Link from "next/link";
import React, { FunctionComponent, HTMLAttributes } from "react";

export const cardStyles = (big = false): SerializedStyles => css({
  background: "var(--color-bg-primary)",
  borderRadius: "0.375rem",
  boxShadow: "inset 0 0 0 1px var(--color-border-primary)",
  padding: big ? "4rem 2rem" : "1rem",
  display: "flex",
  flexDirection: "column",
  color: "inherit",
  textDecoration: "none",
  transition: "all 0.1s",
  justifyContent: big ? "center" : null,
  textAlign: big ? "center" : null,
});

export const cardLinkStyles = css({
  "&:hover": {
    boxShadow: "inset 0 0 0 1px var(--color-text-primary)",
  },
});

export interface CardProps extends HTMLAttributes<HTMLOrSVGElement> {
  href?: string;
  big?: boolean;
}

const Card: FunctionComponent<CardProps> = ({ href, big, ...rest }) => {
  const sharedStyles = cardStyles(big);

  if (href) {
    return (
      <Link href={href} passHref>
        <a
          css={[sharedStyles, cardLinkStyles]}
          {...rest}
        />
      </Link>
    );
  }

  return <div css={sharedStyles} {...rest} />;
};

export default Card;
