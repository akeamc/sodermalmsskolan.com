import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Base from "../components/Base";

const NotFound: NextPage = () => (
  <Base metadata={{
    title: "Sidan hittades inte",
  }}
  >
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <h1>404</h1>
  </Base>
);

export default NotFound;
