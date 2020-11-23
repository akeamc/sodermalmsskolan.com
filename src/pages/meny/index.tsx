import styled from "styled-components";
import { DefaultLayout } from "../../components/layout/Layout/Default";
import { MenuList } from "../../components/food/Menus";
import { AdSection } from "../../components/basic/Ad";
import { Section } from "../../components/layout/Section";
import { Hero } from "../../components/layout/Hero";
import { Base } from "../../components/grid/Base";
import { Col } from "../../components/grid/Col";
import { Navigation } from "../../components/layout/Navigation";
import {
  GridTitleSection,
  wideText,
  leadText,
} from "../../components/basic/Typography";
import React from "react";
import * as breakpoints from "../../styles/breakpoints";
import { FoodGallery } from "../../components/food/Gallery";
import { Card, CardContent } from "../../components/basic/Card";

const Background = styled.div`
  position: relative;
  overflow: hidden;
`;

const GalleryWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const HeroCardWrapper = styled.div`
  grid-column: span 12;

  @media (min-width: ${breakpoints.small}) {
    grid-column: 2 / span 10;
  }

  @media (min-width: ${breakpoints.medium}) {
    grid-column: 3 / span 8;
  }

  @media (min-width: ${breakpoints.large}) {
    grid-column: 4 / span 6;
  }

  @media (min-width: ${breakpoints.extraLarge}) {
    grid-column: 5 / span 4;
  }
`;

const CardLead = styled.p`
  ${leadText};
  margin: 1rem 0;
  text-align: center;
`;

const CardFooter = styled.p`
  ${wideText};
  margin: 0;
  text-align: center;
`;

const Page: React.FunctionComponent = () => {
  return (
    <DefaultLayout
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
      <Background>
        <GalleryWrapper>
          <FoodGallery />
        </GalleryWrapper>
        <Hero>
          <Base>
            <HeroCardWrapper>
              <Card $hoverable={false}>
                <CardContent>
                  <CardLead>
                    I över ett år har vi fotograferat maten som Sodexo serverar
                    och delat bilderna online. Vi kommer aldrig att ge upp.
                  </CardLead>
                  <CardFooter>Åke Amcoff, 2019</CardFooter>
                </CardContent>
              </Card>
            </HeroCardWrapper>
          </Base>
        </Hero>
      </Background>
      {/* <Hero>
        <HeroContent>
          <ImagePane>
            <Image
              layout="fill"
              src="https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg"
            />
          </ImagePane>
          <TitlePane>
            <TitleContainer>
              <HeroTitle>Vi visar upp Sodexo för världen</HeroTitle>
              <LeadText>
                I över ett år har vi fotograferat maten som Sodexo serverar och
                delat bilderna online. Vi kommer aldrig att ge upp.
              </LeadText>
            </TitleContainer>
          </TitlePane>
        </HeroContent>
      </Hero> */}
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
    </DefaultLayout>
  );
};

export default Page;
