import React from "react";
import { Layout } from "../../components/basic/Layout";
import SubjectsOverview from "../../components/digibruh/SubjectsOverview";
import { Navigation } from "../../components/basic/Navigation";
import { Row } from "../../components/grid/Row";
import { Hero } from "../../components/layout/Hero";
import { Col } from "../../components/grid/Col";
import { LeadText } from "../../components/basic/Typography";

const Page: React.FunctionComponent = () => {
  return (
    <Layout title="Digibruh">
      <Navigation />
      <Hero>
        <Row>
          <Col xs={12}>
            <h1>Digibruh</h1>
            <LeadText>Ett digitalt läromedel av elever, för elever.</LeadText>
          </Col>
        </Row>
      </Hero>
      <SubjectsOverview />
    </Layout>
  );
};

export default Page;
