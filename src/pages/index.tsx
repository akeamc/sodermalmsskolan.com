import React from "react";
import { Layout } from "../components/basic/Layout";
import { Section } from "../components/layout/Section";
import { Row } from "../components/grid/Row";
import { Navigation } from "../components/basic/Navigation";
import { Hero } from "../components/layout/Hero";
import { NormalWidth } from "../components/grid/Col";
import { LeadText } from "../components/basic/Typography";
import { ButtonRow, Button } from "../components/basic/Button";
import { LunchWidget } from "../components/menu/LunchWidget";
import { TitleContainer } from "../components/grid/Title";

const Page: React.FunctionComponent = () => {
  return (
    <Layout>
      {/* <WindowConfetti /> */}
      <Navigation />
      <Hero>
        <Row>
          <TitleContainer>
            <h1>Vi visar vad Quality of Life Services egentligen betyder</h1>
            <ButtonRow center>
              <Button href="/digibruh">Digibruh</Button>
              <Button secondary href="/blogg">
                Blogg
              </Button>
            </ButtonRow>
            <LeadText>
              Sedan maj 2019 har vi fotat skolmaten och visat den egentliga
              innebörden av Sodexos slogan <i>Quality of Life Services</i>.
            </LeadText>
          </TitleContainer>
        </Row>
      </Hero>
      <Section>
        <Row>
          <NormalWidth>
            <LunchWidget />
          </NormalWidth>
        </Row>
      </Section>
    </Layout>
  );
};

export default Page;
