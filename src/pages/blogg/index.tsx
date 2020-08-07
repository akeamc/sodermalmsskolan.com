import React from "react";
import { Layout } from "../../components/basic/Layout";
import { PostGridAuto } from "../../components/blog/PostGrid";
import { AdSection } from "../../components/basic/Ad";
import { Section } from "../../components/layout/Section";
import { Col } from "../../components/grid/Col";
import { Row } from "../../components/grid/Row";
import { Hero } from "../../components/layout/Hero";
import { Navigation } from "../../components/basic/Navigation";
import { LeadText, GridTitleSection } from "../../components/basic/Typography";

export default class Page extends React.Component {
  render() {
    return (
      <Layout title="Blogg">
        <Navigation />
        <Hero>
          <Row>
            <Col xs={12}>
              <h1>Vår blogg</h1>
              <LeadText>Skriven mest av Bo.</LeadText>
            </Col>
          </Row>
        </Hero>
        <AdSection />
        <Section>
          <Row>
            <Col xs={12}>
              <GridTitleSection
                title="Senaste inläggen"
                description="Om skolmaten, våra digitala enheter och lite allt möjligt."
              />
            </Col>
          </Row>
          <PostGridAuto />
        </Section>
      </Layout>
    );
  }
}
