import { Theme, useTheme } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import Route from "../../lib/sitemap/route";
import { useBasicRoutes } from "../../lib/sitemap/routes";
import { media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import Container from "../Container";
import LogoIcon from "../logo/Icon";
import navbarBreakpoint from "./breakpoint";
import NavbarWrapper from "./Wrapper";

const RouteLink: FunctionComponent<{route: Route}> = ({ route }) => {
  const router = useRouter();
  const theme = useTheme();

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
          color: theme.color.text.primary,
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

const DesktopNavbar: FunctionComponent = () => {
  const routes = useBasicRoutes();

  return (
    <NavbarWrapper css={(theme: Theme) => ({
      borderBottom: `1px solid ${theme.color.border}`,
      top: 0,
      display: "none",

      [media(navbarBreakpoint)]: {
        display: "block",
      },
    })}
    >
      <Container>
        <nav css={{
          display: "flex",
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
          <ul css={(theme: Theme) => ({
            display: "flex",
            listStyle: "none",
            padding: 0,
            margin: 0,
            height: theme.navigation.height,
          })}
          >
            {routes.map((route) => <RouteLink key={route.href} route={route} />)}
          </ul>
        </nav>
      </Container>
    </NavbarWrapper>
  );
};

export default DesktopNavbar;
