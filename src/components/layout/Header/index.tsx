import styled from "styled-components";
import { TextColorModifier } from "../../basic/Typography";
import { Navigation } from "../../basic/Navigation";
import { Hero } from "../Hero";
import { Row } from "../../grid/Row";
import { ResponsiveHalf } from "../../grid/Col";
import React from "react";

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
`;

export const HeaderWithBackground: React.FunctionComponent<{
  children: any;
  image: string;
  minHeight?: string;
}> = ({ children, image, minHeight }) => {
  return (
    <>
      <Navigation noPlaceholder brightText transparent />
      <Background image={image}>
        <Container bright minHeight={minHeight}>
          <Hero>
            <Row>
              <ResponsiveHalf>{children}</ResponsiveHalf>
            </Row>
          </Hero>
        </Container>
      </Background>
    </>
  );
};
