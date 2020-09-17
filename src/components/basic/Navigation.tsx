import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Row } from "../grid/Row";
import { Logo } from "./Logo";
import { Link, AutoLinkProps } from "./Link";
import { useScrollPosition } from "../../lib/hooks/scroll";
import { TextColorModifier } from "./Typography";
import ScrollLock from "react-scrolllock";
import { UnstyledList } from "./List";
import { useLinks } from "./Footer/Links";
import * as breakpoints from "../../styles/breakpoints";
import { useRouter } from "next/router";
import { useAuth } from "../../providers/Auth";
import { Avatar } from "./Avatar";

const Background = styled.div<{
  floating?: boolean;
  mobileNavOpen: boolean;
  transparent?: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.1s ease, box-shadow 0.1s ease, filter 0.1s ease,
    color 0.1s ease;
  background-color: var(--background);

  ${({ transparent }) =>
    transparent &&
    `
  background-color: transparent;
`}

  ${({ floating }) =>
    floating &&
    `
      background-color: var(--background);
      box-shadow: var(--navigation-shadow);
    `}

  @media (min-width: ${breakpoints.large}) {
    ${({ floating }) =>
      floating &&
      `
      background-color: var(--navigation-background);
      backdrop-filter: saturate(180%) blur(5px);
    `}
  }

  @media (max-width: 991px) {
    ${({ mobileNavOpen }) =>
      mobileNavOpen &&
      `
      box-shadow: var(--navigation-shadow);
    `}
  }
`;

const Wrapper = styled.div`
  grid-column: span 12;
`;

const Placeholder = styled.div`
  min-height: var(--navigation-height);
`;

const Bar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--navigation-height);
`;

const DesktopLinks = styled.div`
  text-align: center;
  display: none;

  @media (min-width: ${breakpoints.large}) {
    display: block;
  }
`;

const DesktopLinkAnchor = styled(Link)<{ $active?: boolean }>`
  float: left;
  margin: 0 10px;
  padding: 10px;
  color: var(--accents-5);
  text-decoration: none;
  font-weight: 400;
  font-size: 0.875rem;
  transition: color 0.1s ease;

  &:hover {
    color: var(--foreground);
  }

  ${({ $active }) =>
    $active &&
    `
    color: var(--foreground);
  `}
`;

const DesktopLink: React.FunctionComponent<AutoLinkProps> = ({
  children,
  href,
  ...rest
}) => {
  const router = useRouter();
  const isActive = router.pathname == href;

  return (
    <DesktopLinkAnchor href={href} $active={isActive} {...rest}>
      {children}
    </DesktopLinkAnchor>
  );
};

const LogoLink = styled(DesktopLink)`
  margin: 0;
  padding: 0;
`;

const DesktopNavigationLogo = styled(Logo)`
  height: 16px;
  color: var(--foreground);
`;

const MobileNavigation = styled.div<{ open: boolean }>`
  background-color: var(--background);
  position: fixed;
  top: var(--navigation-height);
  bottom: 0;
  left: 0;
  right: 0;
  display: none;
  overflow-y: auto;
  padding: 24px;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;

  ${({ open }) =>
    open &&
    `
    display: block;
  `}

  @media (min-width: ${breakpoints.large}) {
    display: none;
  }
`;

const MobileListTitle = styled.h4`
  font-size: 1.25rem;
  letter-spacing: -0.020625rem;
  font-weight: 600;
  margin: 1.5em 0;
`;

const MobileList = styled(UnstyledList)`
  &:first-child {
    ${MobileListTitle} {
      margin-top: 0;
    }
  }
`;

const MobileAnchor = styled(Link)`
  li {
    border-bottom: 1px solid var(--accents-2);
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: var(--foreground);
    user-select: none;
  }
`;

const MobileLink: React.FunctionComponent<{
  children: string;
  href: string;
}> = ({ children, href }) => (
  <MobileAnchor href={href}>
    <li>{children}</li>
  </MobileAnchor>
);

const MobileNavigationToggle = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  height: 40px;
  width: 24px;
  cursor: pointer;

  @media (min-width: ${breakpoints.large}) {
    display: none;
  }
`;

const Bars = styled.div<{ open: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 10px;
  width: 24px;

  &::before,
  &::after {
    width: 24px;
    height: 1px;
    background-color: var(--foreground);
    content: "";
    transition: transform 0.1s ease-in-out;
  }

  &::before {
    transform: translateY(-4px);
  }

  &::after {
    transform: translateY(4px);
  }

  ${({ open }) =>
    open &&
    `
    &::before {
      transform: translateY(1px) rotate(45deg);
    }

    &::after {
      transform: translateY(0) rotate(-45deg);
    }
  `}
`;

export const Navigation: React.FunctionComponent<{
  noPlaceholder?: boolean;
  brightText?: boolean;
  transparent?: boolean;
}> = ({ noPlaceholder = false, brightText = false, transparent = false }) => {
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef();
  const placeholder = !noPlaceholder;

  useScrollPosition(({ current: { y } }) => {
    setFloating(y > 0);
  });

  const toggleOpen = () => {
    setOpen(!open);
  };

  const { isAuthenticated, user, isLoading } = useAuth();

  const categories = useLinks();

  return (
    <>
      <TextColorModifier bright={brightText && !floating}>
        {placeholder && <Placeholder />}
        <Background
          ref={containerRef}
          floating={floating}
          mobileNavOpen={open}
          transparent={transparent}
        >
          <Row>
            <Wrapper>
              <Bar>
                <LogoLink href="/">
                  <DesktopNavigationLogo />
                </LogoLink>
                <DesktopLinks>
                  <DesktopLink href="/meny">Meny</DesktopLink>
                  <DesktopLink href="/blogg">Blogg</DesktopLink>
                  <DesktopLink href="/digibruh">Digibruh</DesktopLink>
                  <DesktopLink href="/schema">Schema</DesktopLink>
                  <DesktopLink href="/galleri">Galleri</DesktopLink>
                </DesktopLinks>
                <DesktopLinks>
                  {isLoading ? (
                    <Avatar placeholder />
                  ) : isAuthenticated ? (
                    <Avatar
                      imageUrl={user?.discord?.avatarURL}
                      useProxy={false}
                      href="/konto"
                    />
                  ) : (
                    <DesktopLink href="/api/auth/login">Logga in</DesktopLink>
                  )}
                </DesktopLinks>
                <MobileNavigationToggle onClick={toggleOpen}>
                  <Bars open={open} />
                </MobileNavigationToggle>
              </Bar>
            </Wrapper>
          </Row>
        </Background>
      </TextColorModifier>
      <ScrollLock isActive={open}>
        <MobileNavigation open={open}>
          {categories.map(({ name, items }, index) => (
            <MobileList key={index}>
              <MobileListTitle>{name}</MobileListTitle>
              {items.map(({ name, href }, index) => (
                <MobileLink key={index} href={href}>
                  {name}
                </MobileLink>
              ))}
            </MobileList>
          ))}
        </MobileNavigation>
      </ScrollLock>
    </>
  );
};
