import Link from "next/link";
import React, { FunctionComponent } from "react";
import RouteCategory from "../../lib/sitemap/category";
import Route from "../../lib/sitemap/route";
import { FooterTitle } from "../text/headings";

const RouteLink: FunctionComponent<{ route: Route }> = ({ route }) => (
  <li
    css={{
      margin: "0.5rem 0",
    }}
  >
    <Link href={route.href} passHref>
      <a
        css={{
          color: "var(--color-text-secondary)",
          transition: "color 0.1s ease",
          textDecoration: "none",
          lineHeight: 1.5,
          letterSpacing: "-0.02em",
          fontSize: "0.875rem",
          fontWeight: 500,

          "&:hover": {
            color: "var(--color-text-primary)",
          },
        }}
      >
        {route.name}
      </a>
    </Link>
  </li>
);

const FooterList: FunctionComponent<{ category: RouteCategory }> = ({
  category,
}) => (
  <div>
    <FooterTitle>{category.name}</FooterTitle>
    <ul
      css={{
        margin: "1rem 0 0",
        padding: 0,
        listStyle: "none",
      }}
    >
      {category.routes.map((route) => (
        <RouteLink route={route} key={route.href} />
      ))}
    </ul>
  </div>
);

export default FooterList;
