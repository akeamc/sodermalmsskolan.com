import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import MenuHeader from "../../components/menu/Header";
import MenuSection from "../../components/menu/MenuSection";

/**
 * A page with useful food menu information.
 *
 * @returns JSX element.
 */
const MenuPage: NextPage = () => (
  <Base metadata={{
    title: "Meny",
  }}
  >
    <MenuHeader />
    <MenuSection />
  </Base>
);

export default MenuPage;
