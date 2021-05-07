import { NextPage } from "next";
import React from "react";
import LogoAnimation from "../components/animation/LogoAnimation";
import ParallaxGallery from "../components/animation/ParallaxGallery";
import TumbleweedSpacer from "../components/animation/TumbleweedSpacer";
import Base from "../components/Base";

/**
 * About us page.
 *
 * @returns {React.ReactElement} Rendered page.
 */
const AboutPage: NextPage = () => (
  <Base
    metadata={{
      title: "Om oss",
      description: "Vår historia.",
    }}
    fullWidth
  >
    <LogoAnimation />
    <div className="text-center my-8 container">
      <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold tracking-tight leading-none mb-4">Snille och smak</h1>
      <p className="text-gray-500 font-medium max-w-2xl mx-auto">
        södermalmsskolan.com grundades i maj 2019 av Åke Amcoff och Bo Strömberg.
        Till en början var syftet helt och hållet att sprida bilder på maten som
        serverades i skolmatsalen.
      </p>
    </div>
    <TumbleweedSpacer src="https://cdn.discordapp.com/attachments/575993879837409290/746316140262981672/image0.jpg" />
    <ParallaxGallery />
    <TumbleweedSpacer src="https://cdn.discordapp.com/attachments/575993879837409290/755738540469387294/image0.jpg" />
  </Base>
);

export default AboutPage;
