import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import SimpleHeader from "../../components/header/Simple";
import StudySetSection from "../../components/studySet/StudySetSection";

/**
 * Page listing all study sets present in Digibruh posts.
 *
 * @returns {React.ReactElement} The page.
 */
const QuizletPage: NextPage = () => (
  <Base
    metadata={{
      title: "Quizlet",
      description: "Glosor och begrepp.",
    }}
    leadingAd
  >
    <SimpleHeader title="Quizlet" sub="Glosor och begrepp." />
    <StudySetSection />
  </Base>
);

export default QuizletPage;
