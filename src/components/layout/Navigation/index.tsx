import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Row } from "../../grid/Row";
import { Logo } from "../../basic/Logo";
import { Link, AutoLinkProps } from "../../basic/Link";
import { TextColorModifier } from "../../basic/Typography";
import ScrollLock from "react-scrolllock";
import { UnstyledList } from "../../basic/List";
import { useLinks } from "../../basic/Footer/Links";
import * as breakpoints from "../../../styles/breakpoints";
import { useRouter } from "next/router";
import { useAuth } from "../../../providers/Auth";
import { Avatar } from "../../basic/Avatar";
import { motion, useViewportScroll } from "framer-motion";
import { NavLogo } from "./Logo";
import { DesktopNav } from "./Desktop";

const Wrapper = styled(motion.div)<{ floating: boolean }>`
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
  z-index: 1000;
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
}> = ({ floating = true, brightText, autoFloat }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { scrollY } = useViewportScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => scrollY.onChange((latest) => setScrolled(latest > 0)), []);

  const categories = useLinks();

  return (
    <Wrapper floating={autoFloat ? scrolled : floating}>
      <TextColorModifier bright={brightText && !floating}>
        <Row>
          <NavigationRow>
            <NavLogo />
            <DesktopNav />
            <p>authentication</p>
          </NavigationRow>
        </Row>
      </TextColorModifier>
    </Wrapper>
  );
};
