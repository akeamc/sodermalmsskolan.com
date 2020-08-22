import React from "react";
import { Layout } from "../../components/basic/Layout";
import { PostGridAuto } from "../../components/blog/PostGrid";
import { Section } from "../../components/layout/Section";
import { Navigation } from "../../components/basic/Navigation";
import FeaturedPost from "../../components/blog/FeaturedPost";
import { Row } from "../../components/grid/Row";

export default class Page extends React.Component {
  render() {
    return (
      <Layout metadata={{ title: "Blogg" }}>
        <Navigation />
        <Section>
          <Row>
            <FeaturedPost />
          </Row>
        </Section>
        <Section>
          <PostGridAuto skip={1} />
        </Section>
      </Layout>
    );
  }
}
