import styled from "styled-components";
import { TextColorModifier } from "../../basic/Typography";
import { Navigation } from "../../basic/Navigation";
import { Hero } from "../Hero";
import { Row } from "../../grid/Row";
import { ResponsiveHalf } from "../../grid/Col";
import React, { useRef, useState } from "react";
import { useScrollPosition } from "../../../lib/hooks/scroll";

const Background = styled.div<{ image: string }>`
  background: ${({ image }) =>
    `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)), url(${image})`};
  background-size: cover;
  background-position: center;
  margin-bottom: var(--section-spacing);
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
  overflow: hidden;
`;

export const HeaderWithBackground: React.FunctionComponent<{
  children: any;
  image: string;
  minHeight?: string;
  fadeDuration?: number;
}> = ({ children, image, minHeight, fadeDuration = 400 }) => {
  const [opacity, setOpacity] = useState<number>(1);
  const [transform, setTransform] = useState<number>(0);

  const ref = useRef<HTMLDivElement>();

  useScrollPosition(
    ({ current: { y } }) => {
      setTransform(y / 4);
      setOpacity(Math.max((fadeDuration - y) / fadeDuration, 0));
    },
    { element: ref, throttle: 10 }
  );

  return (
    <>
      <Navigation noPlaceholder brightText transparent />
      <Background image={image}>
        <Container bright minHeight={minHeight} ref={ref}>
          <Hero
            style={{
              opacity,
              transform: `translateY(${transform}px)`,
            }}
          >
            <Row>
              <ResponsiveHalf>
                <div>{children}</div>
              </ResponsiveHalf>
            </Row>
          </Hero>
        </Container>
      </Background>
    </>
  );
};
