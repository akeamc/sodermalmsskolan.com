import styled from "styled-components";
import { TextColorModifier } from "../../basic/Typography";
import { Navigation } from "../Navigation";
import { Hero } from "../Hero";
import { Base } from "../../grid/Base";
import { ResponsiveHalf } from "../../grid/Col";
import React, { useEffect, useRef, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const Background = styled(motion.div)<{ image: string }>`
  background: ${({ image }) =>
    `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)), url(${image})`};
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
`;

const Container = styled(TextColorModifier)<{ minHeight?: string }>`
  ${({ minHeight }) =>
    minHeight &&
    `
    min-height: ${minHeight};
  `}
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
    (value) => 1 - Math.min(value / ref?.current?.offsetHeight, 1)
  );
  const y = useTransform(scrollY, (value) => value * 0.5);
  const backgroundScale = useTransform(
    scrollY,
    (value) => 1 + Math.max(0, value / (ref?.current?.offsetHeight * 2))
  );

  useEffect(
    () =>
      scrollY.onChange((latest) =>
        setNavFloating(latest > ref?.current?.offsetHeight - 64)
      ),
    []
  );

  return (
    <>
      <Navigation brightText floating={navFloating} padding={false} />
      <Container bright minHeight={minHeight} ref={ref}>
        <motion.div style={{ opacity, y, zIndex: 1 }}>
          <Hero>
            <Base>
              <ResponsiveHalf>
                <div>{children}</div>
              </ResponsiveHalf>
            </Base>
          </Hero>
        </motion.div>
        <Background image={image} style={{ scale: backgroundScale }} />
      </Container>
    </>
  );
};
