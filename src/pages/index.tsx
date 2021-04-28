import React from "react";
import { NextPage } from "next";
import Base from "../components/Base";
import useMenus from "../lib/food/hooks/useMenus";

/**
 * The home page of [södermalmsskolan.com](https://södermalmsskolan.com).
 *
 * @returns {React.ReactElement} JSX element.
 */
const HomePage: NextPage = () => {
  const menus = useMenus();

  return (
    <Base>
      <h1>Meny</h1>
      <ul>
        {menus?.map((menu) => (
          <li key={menu.date}>
            <h3>{menu.date}</h3>
            <ul>
              {menu.dishes.map((dish) => (
                <li key={dish}>{dish}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Base>
  );
};

export default HomePage;
