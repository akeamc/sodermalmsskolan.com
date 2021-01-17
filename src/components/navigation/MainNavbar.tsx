import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import Route from "../../lib/sitemap/route";
import { useBasicRoutes } from "../../lib/sitemap/routes";
import { media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import AuthNavSection from "../auth/AuthNavSection";
import Container from "../Container";
import LogoIcon from "../logo/Icon";
import navbarBreakpoint from "./breakpoint";
import NavbarWrapper from "./Wrapper";

interface RouteLinkProps {
  route: Route
}

/**
 * A link shown in the navbar.
 *
 * @param {React.PropsWithChildren<RouteLinkProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered link.
 */
const RouteLink: FunctionComponent<RouteLinkProps> = ({ route }) => {
  const router = useRouter();

  return (
    <li>
      <Link href={route.href} passHref>
        <a css={[{
          padding: "0 1.25rem",
          height: "100%",
          position: "relative",
          display: "inline-flex",
          placeItems: "center",
          textDecoration: "none",
          fontFamily: fonts.sans,
          fontSize: "0.9375rem",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--color-text-primary)",
          opacity: 0.5,
          transition: "opacity 0.2s",

          "&:hover": {
            opacity: 1,
          },
        }, router.asPath === route.href ? {
          opacity: 1,
        } : {}]}
        >
          {route.name}
        </a>
      </Link>
    </li>
  );
};

/**
 * The main desktop navbar for the page.
 *
 * @returns {React.ReactElement} The rendered navbar.
 */
const MainNavbar: FunctionComponent = () => {
  const routes = useBasicRoutes();

  return (
    <NavbarWrapper css={{
      borderBottom: "1px solid var(--color-border-primary)",
      top: 0,
    }}
    >
      <Container>
        <nav css={{
          display: "flex",
          height: "var(--navbar-height)",
        }}
        >
          <Link href="/" passHref>
            <a css={{
              display: "flex",
              width: "1.5rem",
              marginRight: "2rem",
              placeItems: "center",
            }}
            >
              <LogoIcon css={{
                flex: 1,
              }}
              />
            </a>
          </Link>
          <ul css={{
            display: "none",
            listStyle: "none",
            padding: 0,
            margin: 0,
            height: "var(--navbar-height)",

            [media(navbarBreakpoint)]: {
              display: "flex",
            },
          }}
          >
            {routes.map((route) => <RouteLink key={route.href} route={route} />)}
          </ul>
          <AuthNavSection />
        </nav>
      </Container>
    </NavbarWrapper>
  );
};

export default MainNavbar;
