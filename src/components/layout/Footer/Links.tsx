import styled from "styled-components";
import { Base } from "../../grid/Base";
import { UnstyledList } from "../../basic/List";
import * as breakpoints from "../../../styles/breakpoints";
import React from "react";
import { useAuth } from "../../../providers/Auth";
import { ArrowUpRight } from "react-feather";
import Link from "next/link";

export interface Item {
  name: string;
  href: string;
}

export interface Category {
  name: string;
  items: Item[];
}

export const useLinks = (): Category[] => {
  const { isAuthenticated } = useAuth();

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
        {
          name: "Schema",
          href: "/schema",
        },
        {
          name: "Galleri",
          href: "/galleri",
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
          name: "Veckobrev",
          href: "/veckobrev",
        },
        {
          name: "Serverstatus",
          href: "https://status.lynx.agency",
        },
      ],
    },
  ];
};

const LinkSection = styled(Base)`
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
    margin: 8px 0;
  }
`;

const ColumnTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 16px 0;
  letter-spacing: 0;
`;

const LinkArrow = styled(ArrowUpRight)`
  height: 1.25em;
  width: 1.25em;
  vertical-align: text-top;
`;

const StyledFooterLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};

    ${LinkArrow} {
      transform: translate(10%, -10%);
    }
  }

  ${LinkArrow} {
    transition: transform 0.1s ease;
  }
`;

const FooterLink: React.FunctionComponent<Item> = ({ href, name }) => {
  const isExternal = href.indexOf("//") > -1;

  return (
    <Link href={href} passHref>
      <StyledFooterLink>
        {name} {isExternal && <LinkArrow />}
      </StyledFooterLink>
    </Link>
  );
};

export const FooterLinks: React.FunctionComponent = () => {
  const categories = useLinks();

  return (
    <LinkSection>
      {categories.map(({ name, items }, index) => (
        <Column key={index}>
          <ColumnTitle>{name}</ColumnTitle>
          <List>
            {items.map((item, index) => (
              <li key={index}>
                <FooterLink {...item} />
              </li>
            ))}
          </List>
        </Column>
      ))}
    </LinkSection>
  );
};
