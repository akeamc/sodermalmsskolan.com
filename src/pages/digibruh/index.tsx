import React from "react";
import { Layout } from "../../components/basic/Layout";
import SubjectsOverview from "../../components/digibruh/SubjectsOverview";
import { Navigation } from "../../components/layout/Navigation";
import { HeroWithTitle } from "../../components/layout/Hero/Title";

const Page: React.FunctionComponent = () => {
  return (
    <Layout
      metadata={{
        title: "Digibruh",
        description: "Ett digitalt läromedel av elever, för elever.",
      }}
    >
      <Navigation />
      <HeroWithTitle
        title="Digibruh"
        lead="Ett digitalt läromedel av elever, för elever."
      />
      <SubjectsOverview />
    </Layout>
  );
};

export default Page;
