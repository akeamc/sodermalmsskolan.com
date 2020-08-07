import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Row } from "../grid/Row";
import { Logo } from "./Logo";
import { AutoLink } from "./Link";
import { useScrollPosition } from "../../lib/hooks/scroll";
import { TextColorModifier } from "./Typography";

const Background = styled.div<{ floating?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.1s ease, box-shadow 0.1s ease, filter 0.1s ease,
    color 0.1s ease;

  ${({ floating }) =>
    floating &&
    `
      background-color: var(--background);
      box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
    `}

  @media (min-width: 992px) {
    ${({ floating }) =>
      floating &&
      `
      background-color: var(--header-background);
      backdrop-filter: saturate(180%) blur(5px);
    `}
  }
`;

const Wrapper = styled.div`
  grid-column: span 12;
`;

const Placeholder = styled.div`
  min-height: 80px;
`;

const DesktopNavigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
`;

const DesktopNavigationLinks = styled.div`
  text-align: center;
`;

const DesktopNavigationLink = styled(AutoLink)`
  float: left;
  margin: 0 10px;
  padding: 10px;
  color: var(--accents-5);
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
  transition: color 0.1s ease;

  &:hover {
    color: var(--foreground);
  }
`;

const DesktopNavigationLogoLink = styled(DesktopNavigationLink)`
  margin: 0;
  padding: 0;
`;

const DesktopNavigationLogo = styled(Logo)`
  height: 16px;
  color: var(--foreground);
`;

export const Navigation: React.FunctionComponent<{
  noPlaceholder?: boolean;
  brightText?: boolean;
}> = ({ noPlaceholder = false, brightText = false }) => {
  const [floating, setFloating] = useState(false);
  const containerRef = useRef();
  const placeholder = !noPlaceholder;

  useScrollPosition(({ current: { y } }) => {
    setFloating(y > 0);
  }, 100);

  return (
    <TextColorModifier bright={brightText && !floating}>
      {placeholder && <Placeholder />}
      <Background ref={containerRef} floating={floating}>
        <Row>
          <Wrapper>
            <DesktopNavigation>
              <DesktopNavigationLogoLink href="/">
                <DesktopNavigationLogo />
              </DesktopNavigationLogoLink>
              <DesktopNavigationLinks>
                <DesktopNavigationLink href="/meny">Meny</DesktopNavigationLink>
                <DesktopNavigationLink href="/blogg">
                  Blogg
                </DesktopNavigationLink>
                <DesktopNavigationLink href="/digibruh">
                  Digibruh
                </DesktopNavigationLink>
              </DesktopNavigationLinks>
            </DesktopNavigation>
          </Wrapper>
        </Row>
      </Background>
    </TextColorModifier>
  );
};
