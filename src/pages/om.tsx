import { NextPage } from "next";
import React from "react";
import LogoAnimation from "../components/animation/LogoAnimation";
import Base from "../components/Base";

/**
 * About us page.
 *
 * @returns {React.ReactElement} Rendered page.
 */
const AboutPage: NextPage = () => (
  <Base metadata={{
    title: "Om oss",
    description: "Vår historia.",
  }}
  >
    <LogoAnimation />
    <div className="text-center my-8">
      <h1 className="text-8xl font-bold tracking-tighter leading-none mb-4">Snille och smak</h1>
      <p className="text-gray-500 font-medium max-w-2xl mx-auto">
        södermalmsskolan.com grundades i maj 2019 av Åke Amcoff och Bo Strömberg.
        Till en början var syftet helt och hållet att sprida bilder på maten som
        serverades i skolmatsalen.
      </p>
    </div>
  </Base>
);

export default AboutPage;
