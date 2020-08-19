import React from "react";
import { Layout } from "../../components/basic/Layout";
import { PostGridAuto } from "../../components/blog/PostGrid";
import { AdSection } from "../../components/basic/Ad";
import { Section } from "../../components/layout/Section";
import { Col } from "../../components/grid/Col";
import { Row } from "../../components/grid/Row";
import { Navigation } from "../../components/basic/Navigation";
import { GridTitleSection } from "../../components/basic/Typography";
import { HeroWithTitle } from "../../components/layout/Hero/Title";

export default class Page extends React.Component {
  render() {
    return (
      <Layout metadata={{ title: "Blogg" }}>
        <Navigation />
        <HeroWithTitle title="Vår blogg" lead="Skriven mest av Bo." />
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
