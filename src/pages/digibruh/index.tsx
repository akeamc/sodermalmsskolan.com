import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import DigibruhArticleSection from "../../components/digibruh/Section";
import SimpleHeader from "../../components/header/Simple";

export const Page: NextPage = () => (
  <Base metadata={{
    title: "Digibruh",
    description: "Ett digitalt läromedel av elever, för elever.",
  }}
  >
    <SimpleHeader title="Digibruh" sub="Ett digitalt läromedel av elever, för elever." />
    <DigibruhArticleSection limit="all" />
  </Base>
);

export default Page;
