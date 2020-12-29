import { NextPage } from "next";
import React from "react";
import AuthorSection from "../../components/author/AuthorSection";
import Base from "../../components/Base";
import SimpleHeader from "../../components/header/Simple";

const Page: NextPage = () => (
  <Base metadata={{
    title: "Författare",
  }}
  >
    <SimpleHeader title="Författare" />
    <AuthorSection />
  </Base>
);

export default Page;
