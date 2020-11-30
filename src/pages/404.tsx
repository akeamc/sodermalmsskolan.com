import { DefaultLayout } from "../components/layout/Layout/Default";
import { Navigation } from "../components/layout/Navigation";
import React from "react";
import { SimpleHero } from "../components/layout/Hero/Simple";
import { Game } from "../components/game/Game";
import { NextPage } from "next";
import Head from "next/head";

const Page: NextPage = () => {
  return (
    <DefaultLayout metadata={{ title: "Sidan hittades inte" }}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Navigation />
      <SimpleHero title="Sidan hittades inte" />
      <Game start={[0, 0]} />
    </DefaultLayout>
  );
};

export default Page;
