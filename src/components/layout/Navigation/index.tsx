import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Base } from "../../grid/Row";
import { brightTextStyles } from "../../basic/Typography";
import { motion, useCycle, useViewportScroll } from "framer-motion";
import { NavLogo } from "./Logo";
import { DesktopNav } from "./Desktop";
import { MobileNav } from "./Mobile";
import * as breakpoints from "../../../styles/breakpoints";
import { Toggle } from "./Toggle";

const Wrapper = styled(motion.div)<{
  floating: boolean;
  mobileNavOpen: boolean;
  brightText: boolean;
}>`
  height: var(--navigation-height);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
  ${({ floating }) =>
    floating &&
    `box-shadow: var(--navigation-shadow);
    background: var(--navigation-background);`};

  @media (max-width: ${breakpoints.large}) {
    ${({ mobileNavOpen }) =>
      mobileNavOpen &&
      `box-shadow: var(--navigation-shadow);
    background: var(--navigation-background);`};

    ${({ mobileNavOpen, brightText }) =>
      !mobileNavOpen && brightText && brightTextStyles}
  }

  @media (min-width: ${breakpoints.large}) {
    ${({ brightText }) => brightText && brightTextStyles}
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

  useEffect(() => scrollY.onChange((latest) => setScrolled(latest > 0)), []);

  return (
    <>
      {padding && <Padding />}
      <Wrapper
        floating={autoFloat ? scrolled : floating}
        mobileNavOpen={isOpen}
        brightText={brightText && !floating}
      >
        <Base>
          <NavigationRow>
            <NavLogo />
            <DesktopNav />
            <Toggle toggle={() => toggleOpen()} isOpen={isOpen} />
          </NavigationRow>
        </Base>
      </Wrapper>
      <MobileNav isOpen={isOpen} onClose={() => toggleOpen()} />
    </>
  );
};
