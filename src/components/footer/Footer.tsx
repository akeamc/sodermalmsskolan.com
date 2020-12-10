import { useTheme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import { useRoutes } from "../../lib/sitemap/routes";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import { sectionPaddingStyles } from "../Section";
import { horizontalInlineStack } from "../stack/inline";
import FooterList from "./List";

/**
 * The standard page footer.
 */
const Footer: FunctionComponent = () => {
  const routes = useRoutes();
  const theme = useTheme();

  return (
    <footer
      css={[
        sectionPaddingStyles.top,
        sectionPaddingStyles.bottom,
        {
          backgroundColor: theme.color.background,
        },
      ]}
    >
      <Container>
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
        >
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2rem",

              [media(breakpoints.medium)]: {
                gridTemplateColumns: "repeat(4, 1fr)",
              },

              [media(breakpoints.large)]: {
                gridTemplateColumns: "repeat(6, 1fr)",
              },
            }}
          >
            {routes.map((category) => (
              <FooterList
                category={category}
                key={category.routes.map((route) => route.href).join(":")}
              />
            ))}
          </div>
          <div
            css={horizontalInlineStack({
              spacing: "2rem",
            })}
          >
            <span>
              Designed by Lynx in Norrland
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
