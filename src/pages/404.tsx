import { Layout } from "../components/layout/Layout";
import { Navigation } from "../components/layout/Navigation";
import React from "react";
import { HeroWithTitle } from "../components/layout/Hero/Title";
import { Game } from "../components/game/Game";

const Page: React.FunctionComponent = () => {
  return (
    <Layout metadata={{ title: "Sidan hittades inte" }}>
      <Navigation />
      <HeroWithTitle title="Sidan hittades inte" />
      <Game />
    </Layout>
  );
};

export default Page;
