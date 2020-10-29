import React from "react";
import { Layout } from "../../components/layout/Layout";
import SubjectsOverview from "../../components/digibruh/SubjectsOverview";
import { Navigation } from "../../components/layout/Navigation";
import { SimpleHero } from "../../components/layout/Hero/Simple";

const Page: React.FunctionComponent = () => {
  return (
    <Layout
      metadata={{
        title: "Digibruh",
        description: "Ett digitalt läromedel av elever, för elever.",
      }}
    >
      <Navigation />
      <SimpleHero
        title="Digibruh"
        lead="Ett digitalt läromedel av elever, för elever."
      />
      <SubjectsOverview />
    </Layout>
  );
};

export default Page;
