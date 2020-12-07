import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import MenuHeader from "../../components/food/MenuHeader";

const Page: NextPage = () => (
  <Base metadata={{
    title: "Meny",
  }}
  >
    <MenuHeader />
  </Base>
);

export default Page;
