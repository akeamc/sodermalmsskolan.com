import styled from "styled-components";
import { Layout } from "../components/basic/Layout";
import { AutoLink } from "../components/basic/Link";
import { MenuGrid } from "../components/menu/MenuGrid";
import { AdSection } from "../components/basic/Ad";
import { Section } from "../components/layout/Section";
import { Hero } from "../components/layout/Hero";
import { Row } from "../components/grid/Row";
import { Col } from "../components/grid/Col";
import { Navigation } from "../components/basic/Navigation";
import { Image } from "../components/basic/Image";
import {
  LeadText,
  GridTitleSection,
  GradientText,
} from "../components/basic/Typography";

const HeroContent = styled(Row)`
  grid-auto-flow: dense;
`;

const TitleContainer = styled.div`
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    grid-column: 1 / span 7;
  }

  @media (min-width: 992px) {
    grid-column: 1 / span 5;
  }
`;

const ImageContainer = styled.div`
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 576px) {
    grid-column: 2 / span 10;
  }

  @media (min-width: 768px) {
    grid-column: 8 / span 5;
  }
`;

const Page: React.FunctionComponent = () => {
  return (
    <Layout title="Meny">
      <Navigation />
      <Hero>
        <HeroContent>
          <ImageContainer>
            <Image src="https://cdn.discordapp.com/attachments/575993879837409290/666282862151991296/IMG_3695.JPG" />
          </ImageContainer>
          <TitleContainer>
            <h1>
              Vi visar upp{" "}
              <GradientText startColor="var(--color)" endColor="#00DFD8">
                Sodexo
              </GradientText>{" "}
              för världen
            </h1>
            <LeadText>
              I över ett år har vi fotat maten som Sodexo serverar och spridit
              bilderna på nätet. Vi kommer aldrig ge upp.
            </LeadText>
          </TitleContainer>
        </HeroContent>
      </Hero>
      <AdSection />
      <Section>
        <Row>
          <Col xs={12}>
            <GridTitleSection title="Menyn" />
          </Col>
        </Row>
        <MenuGrid numberOfMenus={7} />
        <Row>
          <Col xs={12}>
            <p>
              Källa:{" "}
              <AutoLink href="https://skolmaten.se/sodermalmsskolan-gamla-maria/">
                skolmaten.se
              </AutoLink>
              .
            </p>
          </Col>
        </Row>
      </Section>
      <AdSection />
    </Layout>
  );
};

export default Page;
