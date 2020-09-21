import React from "react";
import { Layout } from "../components/layout/Layout";
import { Section } from "../components/layout/Section";
import { Row } from "../components/grid/Row";
import { Navigation } from "../components/layout/Navigation";
import { NormalWidth } from "../components/grid/Col";
import { ButtonRow, Button } from "../components/basic/Button";
import { LunchWidget } from "../components/menu/LunchWidget";
import { HeroWithTitle } from "../components/layout/Hero/Title";

const Page: React.FunctionComponent = () => {
  return (
    <Layout>
      <Navigation autoFloat />
      <HeroWithTitle
        title="Vi visar vad Quality of Life Services egentligen betyder"
        lead={
          <>
            Sedan maj 2019 har vi fotat skolmaten och visat den egentliga
            innebörden av Sodexos slogan <i>Quality of Life Services</i>.
          </>
        }
      >
        <ButtonRow center>
          <Button href="/meny">Visa menyn</Button>
          <Button $secondary href="/digibruh">
            Öppna Digibruh
          </Button>
        </ButtonRow>
      </HeroWithTitle>
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
