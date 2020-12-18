import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Base from "../components/Base";
import Footer from "../components/footer/Footer";
import SimpleHeader from "../components/header/Simple";
import MenuText from "../components/menu/Text";

const NotFound: NextPage = () => (
  <Base metadata={{
    title: "Sidan hittades inte",
  }}
  >
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <SimpleHeader
      title="Sidan hittades inte"
      sub={<MenuText />}
    />
    <Footer />
  </Base>
);

export default NotFound;
