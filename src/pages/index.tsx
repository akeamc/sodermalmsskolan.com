import React from "react";
import { NextPage } from "next";
import Base from "../components/Base";
import MenuList from "../components/menu/MenuList";

/**
 * The home page of [södermalmsskolan.com](https://södermalmsskolan.com).
 *
 * @returns {React.ReactElement} JSX element.
 */
const HomePage: NextPage = () => (
  <Base>
    <h1 className="text-4xl font-bold tracking-tight">Meny</h1>
    <MenuList />
  </Base>
);

export default HomePage;
