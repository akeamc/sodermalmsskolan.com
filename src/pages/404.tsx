import { DefaultLayout } from "../components/layout/Layout/Default";
import { Navigation } from "../components/layout/Navigation";
import React from "react";
import { SimpleHero } from "../components/layout/Hero/Simple";
import { Game } from "../components/game/Game";

const Page: React.FunctionComponent = () => {
  return (
    <DefaultLayout metadata={{ title: "Sidan hittades inte" }}>
      <Navigation />
      <SimpleHero title="Sidan hittades inte" />
      <Game start={[0, 0]} />
    </DefaultLayout>
  );
};

export default Page;
