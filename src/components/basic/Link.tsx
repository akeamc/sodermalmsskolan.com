import styled from "styled-components";
import NextLink from "next/link";
import React from "react";
import { Anchor } from "./Typography";

export interface AutoLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export const Link: React.FunctionComponent<AutoLinkProps> = ({
  href = "",
  children,
  ...props
}) => {
  return (
    <NextLink href={href} passHref>
      <Anchor {...props}>{children}</Anchor>
    </NextLink>
  );
};

export const LinkBlock = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;
