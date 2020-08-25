import styled from "styled-components";
import { Row } from "../../grid/Row";
import { AutoLink } from "../Link";
import { UnstyledList } from "../List";
import * as breakpoints from "../../../styles/breakpoints";
import React from "react";
import { useAuth } from "../../../providers/Auth";

export interface Item {
  name: string;
  href: string;
}

export interface Category {
  name: string;
  items: Item[];
}

export const useLinks = () => {
  const { isAuthenticated, user } = useAuth();

  return [
    {
      name: "Navigera",
      items: [
        {
          name: "Start",
          href: "/",
        },
        {
          name: "Meny",
          href: "/meny",
        },
        {
          name: "Digibruh",
          href: "/digibruh",
        },
      ],
    },
    {
      name: "Organisationen",
      items: [
        {
          name: "Blogg",
          href: "/blogg",
        },
        {
          name: "Om oss",
          href: "/om",
        },
      ],
    },
    {
      name: "Konto",
      items: isAuthenticated
        ? [
            {
              name: "Logga ut",
              href: "/api/auth/logout",
            },
            {
              name: "Konto",
              href: "/konto",
            },
          ]
        : [
            {
              name: "Logga in",
              href: "/api/auth/login",
            },
          ],
    },
    {
      name: "Resurser",
      items: [
        {
          name: "Serverstatus",
          href: "https://status.lynx.agency",
        },
      ],
    },
  ];
};

const LinkSection = styled(Row)`
  margin-top: 24px;
  margin-bottom: 48px;
`;

const Column = styled.div`
  grid-column: span 6;

  @media (min-width: ${breakpoints.medium}) {
    grid-column: span 4;
  }

  @media (min-width: ${breakpoints.large}) {
    grid-column: span 3;
  }
`;

const List = styled(UnstyledList)`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 12px 0;
  }

  a {
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--accents-5);

    &:hover {
      color: var(--foreground);
    }
  }
`;

const ColumnTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--foreground);
  margin: 16px 0;
  letter-spacing: 0;
`;

export const FooterLinks: React.FunctionComponent = () => {
  const categories = useLinks();

  return (
    <LinkSection>
      {categories.map(({ name, items }, index) => (
        <Column key={index}>
          <ColumnTitle>{name}</ColumnTitle>
          <List>
            {items.map(({ name, href }, index) => (
              <li key={index}>
                <AutoLink key={index} href={href}>
                  {name}
                </AutoLink>
              </li>
            ))}
          </List>
        </Column>
      ))}
    </LinkSection>
  );
};
