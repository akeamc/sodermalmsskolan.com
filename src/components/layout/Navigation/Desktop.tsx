import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../../providers/Auth";
import { Avatar } from "../../basic/Avatar";
import { UnstyledList } from "../../basic/List";
import * as breakpoints from "../../../styles/breakpoints";

const List = styled(UnstyledList)`
  margin: 0;
  padding: 0;
  display: none;

  @media (min-width: ${breakpoints.large}) {
    display: block;
  }
`;

const ListItem = styled.li<{ $active: boolean }>`
  float: left;

  a {
    color: var(--accents-3);
    font-weight: 500;
    transition: color 0.2s;
    float: left;
    margin: 0px 10px;
    padding: 10px;
    font-size: 0.875rem;

    &:hover {
      color: var(--foreground);
    }

    ${({ $active }) => $active && `color: var(--foreground)`}
  }
`;

const Item: React.FunctionComponent<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => {
  const router = useRouter();

  return (
    <ListItem $active={router.asPath == href}>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </ListItem>
  );
};

export const DesktopNav: React.FunctionComponent = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  return (
    <>
      <List>
        <Item href="/meny">Meny</Item>
        <Item href="/blogg">Blogg</Item>
        <Item href="/digibruh">Digibruh</Item>
        <Item href="/schema">Schema</Item>
        <Item href="/galleri">Galleri</Item>
      </List>
      <List>
        {isLoading ? (
          <Avatar placeholder />
        ) : isAuthenticated ? (
          <Avatar
            imageUrl={user?.discord?.avatarURL}
            useProxy={false}
            href="/konto"
          />
        ) : (
          <Item href="/api/auth/login">Logga in</Item>
        )}
      </List>
    </>
  );
};
