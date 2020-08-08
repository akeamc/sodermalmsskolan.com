import styled from "styled-components";
import { TextColorModifier } from "../basic/Typography";
import { Navigation } from "../basic/Navigation";
import { Hero } from "./Hero";
import { Row } from "../grid/Row";
import { ResponsiveHalf } from "../grid/Col";

const Background = styled.div<{ image: string }>`
  background-size: cover;
  background-position: center;
  background-image: ${({ image }) => `url(${image})`};
  margin-bottom: var(--section-spacing);
`;

const Overlay = styled.div`
  backdrop-filter: brightness(30%);
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
      <Navigation noPlaceholder brightText />
      <Background image={image}>
        <Overlay>
          <Container bright minHeight={minHeight}>
            <Hero>
              <Row>
                <ResponsiveHalf>{children}</ResponsiveHalf>
              </Row>
            </Hero>
          </Container>
        </Overlay>
      </Background>
    </>
  );
};
