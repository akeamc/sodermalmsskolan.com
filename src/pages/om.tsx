import { NextPage } from "next";
import React from "react";
import Base from "../components/Base";
import LogoIcon from "../components/logo/LogoIcon";

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
    <div className="flex min-h-screen justify-center items-center">
      <LogoIcon className="w-32 h-32 my-4" />
    </div>
  </Base>
);

export default AboutPage;
