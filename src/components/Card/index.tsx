/* eslint-disable jsx-a11y/anchor-has-content */
import Link from "next/link";
import React, { FunctionComponent, HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLOrSVGElement> {
  href?: string;
  big?: boolean;
  footer?: ReactNode;
}

/**
 * A card.
 *
 * @param {React.PropsWithChildren<CardProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered card.
 */
const Card: FunctionComponent<CardProps> = ({
  href, big, footer, ...rest
}) => {
  const inner = (
    <div
      css={[{
        background: "var(--color-bg-primary)",
        "--card-padding-y": big ? "4rem" : "1rem",
        "--card-padding-x": big ? "2rem" : "1rem",
        borderRadius: "0.375rem",
        border: "1px solid var(--color-border-primary)",
        boxShadow: "border-box",
        display: "flex",
        flexDirection: "column",
        color: "inherit",
        transition: "all 0.1s",
        justifyContent: big ? "center" : null,
        textAlign: big ? "center" : null,
        height: "100%",
      }, href ? {
        "&:hover": {
          borderColor: "var(--color-text-primary)",
        },
      } : null]}
    >
      <div
        css={{
          padding: "var(--card-padding-y) var(--card-padding-x)",
        }}
        {...rest}
      />
      {footer ? (
        <footer css={{
          padding: "0.5rem var(--card-padding-x)",
          backgroundColor: "var(--accents-1)",
          borderTop: "1px solid var(--color-border-primary)",
        }}
        >
          {footer}
        </footer>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        <a
          css={{
            textDecoration: "none",
          }}
        >
          {inner}
        </a>
      </Link>
    );
  }

  return inner;
};

export default Card;
