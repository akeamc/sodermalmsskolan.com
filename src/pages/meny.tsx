import styled from "styled-components";
import { Layout } from "../components/layout/Layout";
import { MenuList } from "../components/food/Menus";
import { AdSection } from "../components/basic/Ad";
import { Section } from "../components/layout/Section";
import { Hero } from "../components/layout/Hero";
import { Base } from "../components/grid/Base";
import { Col } from "../components/grid/Col";
import { Navigation } from "../components/layout/Navigation";
import { Image } from "../components/basic/Image";
import { LeadText, GridTitleSection } from "../components/basic/Typography";
import { TitleContainer } from "../components/layout/Hero/Simple";
import React from "react";
import * as breakpoints from "../styles/breakpoints";

const HeroContent = styled(Base)`
  grid-auto-flow: dense;
`;

const TitlePane = styled.div`
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${TitleContainer} {
    text-align: center;
  }

  @media (min-width: ${breakpoints.medium}) {
    grid-column: 1 / span 7;

    ${TitleContainer} {
      text-align: inherit;
    }
  }

  @media (min-width: ${breakpoints.large}) {
    grid-column: 1 / span 5;
  }
`;

const ImagePane = styled.div`
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: calc(var(--section-spacing) / 2);

  img {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  @media (min-width: ${breakpoints.small}) {
    grid-column: 2 / span 10;
  }

  @media (min-width: ${breakpoints.medium}) {
    grid-column: 8 / span 5;
    margin-bottom: 0;
  }
`;

const Page: React.FunctionComponent = () => {
  return (
    <Layout
      metadata={{
        title: "Meny",
        description:
          "I över ett år har vi fotograferat maten som Sodexo serverar och spridit bilderna på nätet. Vi kommer aldrig ge upp.",
        images: [
          "https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg",
        ],
      }}
    >
      <Navigation />
      <Hero>
        <HeroContent>
          <ImagePane>
            <Image src="https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg" />
          </ImagePane>
          <TitlePane>
            <TitleContainer>
              <h1>Vi visar upp Sodexo för världen</h1>
              <LeadText>
                I över ett år har vi fotograferat maten som Sodexo serverar och
                delat bilderna online. Vi kommer aldrig att ge upp.
              </LeadText>
            </TitleContainer>
          </TitlePane>
        </HeroContent>
      </Hero>
      <AdSection />
      <Section>
        <Base>
          <Col xs={12}>
            <GridTitleSection title="Menyn" />
          </Col>
        </Base>
        <MenuList limit={30} />
      </Section>
      <AdSection />
    </Layout>
  );
};

export default Page;
