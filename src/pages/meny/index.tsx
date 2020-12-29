import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import MenuHeader from "../../components/menu/Header";
import MenuSection from "../../components/menu/MenuSection";

const Page: NextPage = () => (
  <Base metadata={{
    title: "Meny",
  }}
  >
    <MenuHeader />
    <MenuSection />
  </Base>
);

export default Page;
