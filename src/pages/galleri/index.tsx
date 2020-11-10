import React from "react";
import { DefaultLayout } from "../../components/layout/Layout/Default";
import { Navigation } from "../../components/layout/Navigation";
import { FoodGallery } from "../../components/food/FoodGallery";
import { Base } from "../../components/grid/Base";
import { Col } from "../../components/grid/Col";
import { Hero } from "../../components/layout/Hero";

const Page: React.FunctionComponent = () => {
  return (
    <DefaultLayout
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
      <Hero>
        <Base>
          <Col>
            <FoodGallery />
          </Col>
        </Base>
      </Hero>
    </DefaultLayout>
  );
};

export default Page;
