import React from "react";
import { NextPage } from "next";
import Base from "../components/Base";

/**
 * The home page of [södermalmsskolan.com](https://södermalmsskolan.com).
 *
 * @returns {React.ReactElement} JSX element.
 */
const HomePage: NextPage = () => (
  <Base>
    <h1 className="text-4xl font-semibold tracking-tight mt-4 md:mt-16">
      Vi har flyttat!
    </h1>
    <p className="mt-4">
      Nu finns matsedeln på
      {" "}
      <a
        href="https://skolorna.com/menyer/https://skolorna.com/menyer/c18303fe-8b6a-54e8-a26c-9efcb35bbc1a?utm_source=sodermalmsskolan&utm_medium=sodermalmsskolan&utm_campaign=sodermalmsskolan"
        className="text-blue-500"
      >
        skolorna.com
      </a>
      {" "}
      istället.
    </p>
  </Base>
);

export default HomePage;
