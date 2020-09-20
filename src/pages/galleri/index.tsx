import React from "react";
import { Layout } from "../../components/basic/Layout";
import { Navigation } from "../../components/layout/Navigation";
import { HeroWithTitle } from "../../components/layout/Hero/Title";
import { FoodGallery } from "../../components/food/FoodGallery";
import { Section } from "../../components/layout/Section";
import { Row } from "../../components/grid/Row";
import { NormalWidth } from "../../components/grid/Col";

const Page: React.FunctionComponent = () => {
  return (
    <Layout
      metadata={{
        title: "Galleri",
        description:
          "Fotografier av maten som serveras på Södermalmsskolan av Sodexo.",
        images: [
          "https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg",
          "https://cdn.discordapp.com/attachments/575993879837409290/622014849173553152/IMG_20190913_122411.jpg",
          "https://cdn.discordapp.com/attachments/575993879837409290/666282862151991296/IMG_3695.JPG",
        ],
      }}
    >
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
