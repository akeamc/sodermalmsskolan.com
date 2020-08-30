import React from "react";
import { Layout } from "../../components/basic/Layout";
import { Navigation } from "../../components/basic/Navigation";
import { HeroWithTitle } from "../../components/layout/Hero/Title";
import { FoodGallery } from "../../components/food/FoodGallery";
import { Section } from "../../components/layout/Section";
import { Row } from "../../components/grid/Row";
import { NormalWidth } from "../../components/grid/Col";

const Page: React.FunctionComponent = () => {
  return (
    <Layout metadata={{ title: "Galleri" }}>
      <Navigation />
      <HeroWithTitle title="Galleri" />
      <Section>
        <Row>
          <NormalWidth>
            <FoodGallery />
          </NormalWidth>
        </Row>
      </Section>
    </Layout>
  );
};

export default Page;
