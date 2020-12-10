import { Theme, useTheme } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import Route from "../../lib/sitemap/route";
import { useBasicRoutes } from "../../lib/sitemap/routes";
import { fonts } from "../../styles/text";
import Container from "../Container";
import LogoIcon from "../logo/Icon";

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

const Navbar: FunctionComponent = () => {
  const routes = useBasicRoutes();

  return (
    <div css={(theme: Theme) => ({
      backgroundColor: theme.color.background,
      boxShadow: theme.navigation.boxShadow,
      height: theme.navigation.height,
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
            listStyle: "none",
            display: "flex",
            padding: 0,
            margin: 0,
            height: theme.navigation.height,
          })}
          >
            {routes.map((route) => <RouteLink key={route.href} route={route} />)}
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
