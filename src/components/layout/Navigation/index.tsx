import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, useTheme } from "styled-components";
import { Base } from "../../grid/Base";
import { motion, useCycle, useViewportScroll } from "framer-motion";
import { NavLogo } from "./Logo";
import { DesktopNav } from "./Desktop";
import { MobileNav } from "./Mobile";
import * as breakpoints from "../../../styles/breakpoints";
import { Toggle } from "./Toggle";
import { transparentLightPalette } from "../../../styles/themes";

const Wrapper = styled(motion.div)<{
  floating: boolean;
  mobileNavOpen: boolean;
}>`
  height: var(--navigation-height);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
  ${({ floating, theme }) =>
    floating &&
    `box-shadow: ${theme.shadows.navigation};
    background: ${theme.colors.background};`};

  @media (max-width: ${breakpoints.large}) {
    ${({ mobileNavOpen, theme }) =>
      mobileNavOpen &&
      `box-shadow: ${theme.shadows.navigation};
    background: ${theme.colors.background};`};
  }

  z-index: 1000;
`;

const Padding = styled.div`
  height: var(--navigation-height);
`;

const NavigationRow = styled.div`
  grid-column: span 12;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--navigation-height);
`;

export const Navigation: React.FunctionComponent<{
  brightText?: boolean;
  floating?: boolean;

  /**
   * Automatically float whenever the user scrolls.
   */
  autoFloat?: boolean;

  padding?: boolean;
}> = ({
  floating = true,
  brightText = false,
  autoFloat = false,
  padding = true,
}) => {
  const { scrollY } = useViewportScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isOpen, toggleOpen] = useCycle(false, true);

  useEffect(() => scrollY.onChange((latest) => setScrolled(latest > 0)));

  const theme = useTheme();
  const wrapperTheme =
    brightText && !floating && !isOpen
      ? { ...theme, colors: transparentLightPalette }
      : theme;

  return (
    <>
      {padding && <Padding />}
      <ThemeProvider theme={wrapperTheme}>
        <Wrapper
          floating={autoFloat ? scrolled : floating}
          mobileNavOpen={isOpen}
        >
          <Base>
            <NavigationRow>
              <NavLogo />
              <DesktopNav />
              <Toggle toggle={() => toggleOpen()} isOpen={isOpen} />
            </NavigationRow>
          </Base>
        </Wrapper>
      </ThemeProvider>
      <MobileNav isOpen={isOpen} onClose={() => toggleOpen()} />
    </>
  );
};
