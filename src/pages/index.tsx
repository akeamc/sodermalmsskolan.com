import styled from "styled-components";
import React from "react";
import { Layout } from "../components/basic/Layout";
import { Section } from "../components/layout/Section";
import { Row } from "../components/grid/Row";
import { Navigation } from "../components/basic/Navigation";
import { Hero } from "../components/layout/Hero";
import { TitleContainer, NormalContainer } from "../components/grid/Col";
import { LeadText } from "../components/basic/Typography";
import { ButtonRow, Button } from "../components/basic/Button";
import { LunchWidget } from "../components/menu/LunchWidget";

const Title = styled.h1`
  margin-bottom: 56px;
`;

const Lead = styled(LeadText)`
  margin-top: 48px;
`;

const Page: React.FunctionComponent = () => {
  return (
    <Layout>
      {/* <WindowConfetti /> */}
      <Navigation />
      <Hero>
        <Row>
          <TitleContainer>
            <Title>
              Vi visar vad Quality of Life Services egentligen betyder
            </Title>
            <ButtonRow center>
              <Button href="/digibruh">Digibruh</Button>
              <Button secondary href="/blogg">
                Blogg
              </Button>
            </ButtonRow>
            <Lead>
              Sedan maj 2019 har vi fotat skolmaten och visat den egentliga
              innebörden av Sodexos slogan <i>Quality of Life Services</i>.
            </Lead>
          </TitleContainer>
        </Row>
      </Hero>
      <Section>
        <Row>
          <NormalContainer>
            <LunchWidget />
          </NormalContainer>
        </Row>
      </Section>
    </Layout>
  );
};

export default Page;
