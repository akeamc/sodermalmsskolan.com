import React from "react";
import { Layout } from "../components/layout/Layout";
import { Section } from "../components/layout/Section";
import { Base } from "../components/grid/Base";
import { Navigation } from "../components/layout/Navigation";
import { NormalWidth } from "../components/grid/Col";
import { ButtonRow, Button } from "../components/basic/Button";
import { LunchWidget } from "../components/food/LunchWidget";
import { EpicHero } from "../components/layout/Hero/Epic";
import { LeadText } from "../components/basic/Typography";
import { HeroTitle } from "../components/layout/Hero";

const Page: React.FunctionComponent = () => {
  return (
    <Layout>
      <Navigation autoFloat />
      <EpicHero
        left={
          <>
            <HeroTitle>Snille och smak</HeroTitle>
            <LeadText>
              Sedan maj 2019 har vi fotat skolmaten och visat den egentliga
              innebörden av Sodexos slogan <i>Quality of Life Services</i>.
            </LeadText>
            <ButtonRow>
              <Button href="/meny">Visa menyn</Button>
              <Button secondary href="/digibruh">
                Öppna Digibruh
              </Button>
            </ButtonRow>
          </>
        }
      />
      <Section>
        <Base>
          <NormalWidth>
            <LunchWidget />
          </NormalWidth>
        </Base>
      </Section>
    </Layout>
  );
};

export default Page;
