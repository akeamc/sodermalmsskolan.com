import React from "react";
import { DefaultLayout } from "../../components/layout/Layout/Default";
import { PostGridAuto } from "../../components/blog/PostGrid";
import { Section } from "../../components/layout/Section";
import { Navigation } from "../../components/layout/Navigation";
import FeaturedPost from "../../components/blog/FeaturedPost";
import { Base } from "../../components/grid/Base";
import { Hero } from "../../components/layout/Hero";

const Page: React.FunctionComponent = () => {
  return (
    <DefaultLayout metadata={{ title: "Blogg" }}>
      <Navigation />
      <Hero>
        <Base>
          <FeaturedPost />
        </Base>
      </Hero>
      <Section>
        <PostGridAuto skip={1} />
      </Section>
    </DefaultLayout>
  );
};

export default Page;
