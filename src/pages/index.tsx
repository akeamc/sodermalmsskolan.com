import React from "react";
import { NextPage } from "next";
import Base from "../components/Base";
import MenuList from "../components/menu/MenuList";
import { MenuContextProvider } from "../lib/food/MenuContext";
import MenuToolbar from "../components/menu/MenuToolbar";
import BannerAd from "../components/ads/BannerAd";

/**
 * The home page of [södermalmsskolan.com](https://södermalmsskolan.com).
 *
 * @returns {React.ReactElement} JSX element.
 */
const HomePage: NextPage = () => (
  <Base>
    <div>
      <BannerAd />
    </div>
    <h1 className="text-4xl font-semibold tracking-tight mt-4 md:mt-16">Meny</h1>
    <MenuContextProvider>
      <MenuToolbar />
      <MenuList />
    </MenuContextProvider>
  </Base>
);

export default HomePage;
