import React, { FunctionComponent } from "react";
import { useRoutes } from "../../lib/sitemap/routes";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import Container from "../Container";
import horizontalInlineStack from "../stack/horizontalInlineStack";
import FooterList from "./List";

/**
 * Bottom row of footer.
 *
 * @returns {React.ReactElement} Rendered bottom row.
 */
const BottomRow: FunctionComponent = () => (
  <div
    css={horizontalInlineStack({
      spacing: "2rem",
    })}
  >
    <span css={{
      fontSize: "0.875rem",
      fontFamily: fonts.monospace,
      letterSpacing: "-0.025em",
      fontStyle: "italic",
      color: "var(--color-text-tertiary)",
    }}
    >
      Designed by Lynx in Norrland
    </span>
  </div>
);

/**
 * The standard page footer.
 *
 * @returns {React.ReactElement} The rendered footer.
 */
const Footer: FunctionComponent = () => {
  const routes = useRoutes();

  return (
    <footer
      css={{
        padding: "var(--section-padding)",
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      <Container width="normal">
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
          <BottomRow />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
