import styled from "styled-components";
import NextLink from "next/link";
import React from "react";

export interface AutoLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export const Link: React.FunctionComponent<AutoLinkProps> = ({
  href = "",
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export const LinkBlock = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;
