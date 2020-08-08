import React from "react";
import { Layout } from "../../components/basic/Layout";
import SubjectsOverview from "../../components/digibruh/SubjectsOverview";
import { Navigation } from "../../components/basic/Navigation";
import { Row } from "../../components/grid/Row";
import { Hero } from "../../components/layout/Hero";
import { LeadText } from "../../components/basic/Typography";
import { TitleContainer } from "../../components/grid/Title";

const Page: React.FunctionComponent = () => {
  return (
    <Layout title="Digibruh">
      <Navigation />
      <Hero>
        <Row>
          <TitleContainer>
            <h1>Digibruh</h1>
            <LeadText>Ett digitalt läromedel av elever, för elever.</LeadText>
          </TitleContainer>
        </Row>
      </Hero>
      <SubjectsOverview />
    </Layout>
  );
};

export default Page;
