import { NextPage } from "next";
import React from "react";
import FoodGallery from "../components/animation/FoodGallery";
import HikeGallery from "../components/animation/HikeGallery";
import LogoAnimation from "../components/animation/LogoAnimation";
import ParagraphSection from "../components/animation/ParagraphSection";
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
      images: ["/assets/bjorkeby.jpg"],
      twitterCard: "summary_large_image",
    }}
    fullWidth
  >
    <LogoAnimation />
    <div className="text-center my-8 container">
      <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold tracking-tight leading-none mb-4">Snille och smak</h1>
      <p className="text-gray-500 font-medium max-w-2xl mx-auto">
        södermalmsskolan.com grundades i maj 2019 av Åke Amcoff och Bo Strömberg.
        Vårt syfte var – och är – att sprida information. Nu har vi lämnat grundskolan bakom oss,
        men vår hemsida lever vidare.
      </p>
    </div>
    <FoodGallery />
    <ParagraphSection>
      södermalmsskolan.com är en (ofrivilligt) icke-vinstdrivande organisation.
      Vi står för elevers rättigheter i skolan och motsätter oss all form av censur
      och byråkratisk jargong.
    </ParagraphSection>
    <TumbleweedSpacer src="/assets/burger.jpg" />
    <HikeGallery />
    <TumbleweedSpacer src="/assets/pasta.jpg" />
  </Base>
);

export default AboutPage;
