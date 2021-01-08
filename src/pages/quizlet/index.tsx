import { NextPage } from "next";
import React from "react";
import BannerAd from "../../components/ads/BannerAd";
import Base from "../../components/Base";
import SimpleHeader from "../../components/header/Simple";
import Section from "../../components/section/Section";
import StudySetSection from "../../components/studySet/StudySetSection";

/**
 * Page listing all study sets present in Digibruh posts.
 *
 * @returns {React.ReactElement} The page.
 */
const QuizletPage: NextPage = () => (
  <Base metadata={{
    title: "Quizlet",
  }}
  >
    <SimpleHeader title="Quizlet" sub="Glosor och begrepp." />
    <Section>
      <BannerAd />
    </Section>
    <StudySetSection />
  </Base>
);

export default QuizletPage;
