import styled from "styled-components";
import Link from "next/link";
import React from "react";

export interface AutoLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const AutoLink: React.FunctionComponent<AutoLinkProps> = ({
  href = "",
  children,
  ...props
}) => {
  const isExternal = href.indexOf("//") > -1;

  return isExternal ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
};

export const LinkBlock = styled(AutoLink)`
  text-decoration: none;
  color: inherit;
  display: block;
`;
