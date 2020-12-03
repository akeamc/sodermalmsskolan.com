import styled, { css, ThemeProvider, useTheme } from "styled-components";
import { Navigation } from "../Navigation";
import { Hero } from "../Hero";
import { Base } from "../../grid/Base";
import { ResponsiveHalf } from "../../grid/Col";
import React, { useEffect, useRef, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { transparentLightPalette } from "../../../styles/themes";
import Image from "next/image";

const BackgroundWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background-color: ${({ theme }) => theme.colors.skeleton.base};

  &::before {
    content: "";
    background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  img {
    z-index: -1;
    object-fit: cover;
  }
`;

const Container = styled.div<{ minHeight?: string }>`
  ${({ minHeight }) =>
    minHeight
      ? css`
          min-height: ${minHeight};
        `
      : null}
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: var(--navigation-height);
  margin-bottom: var(--section-spacing);
  overflow: hidden;
  position: relative;
  background-color: #000;
`;

export const HeaderWithBackground: React.FunctionComponent<{
  children: React.ReactNode;
  image: string;
  minHeight?: string;
  fadeDuration?: number;
}> = ({ children, image, minHeight }) => {
  const { scrollY } = useViewportScroll();
  const ref = useRef<HTMLDivElement>();
  const [navFloating, setNavFloating] = useState<boolean>(false);

  const opacity = useTransform(
    scrollY,
    (value) => 1 - Math.min(value / ref?.current?.offsetHeight || 0, 1)
  );

  const y = useTransform(scrollY, (value) => value * 0.5);

  const backgroundScale = useTransform(
    scrollY,
    (value) => 1 + Math.max(0, value / (ref?.current?.offsetHeight * 2))
  );

  useEffect(() =>
    scrollY.onChange((latest) =>
      setNavFloating(latest > ref?.current?.offsetHeight - 64)
    )
  );

  const theme = useTheme();

  return (
    <>
      <Navigation brightText floating={navFloating} padding={false} />
      <ThemeProvider theme={{ ...theme, colors: transparentLightPalette }}>
        <Container minHeight={minHeight} ref={ref}>
          <motion.div style={{ opacity, y, zIndex: 1 }}>
            <Hero>
              <Base>
                <ResponsiveHalf>
                  <div>{children}</div>
                </ResponsiveHalf>
              </Base>
            </Hero>
          </motion.div>
          <BackgroundWrapper style={{ scale: backgroundScale }}>
            {image ? <Image src={image} layout="fill" /> : null}
          </BackgroundWrapper>
        </Container>
      </ThemeProvider>
    </>
  );
};
