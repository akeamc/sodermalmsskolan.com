import { NextPage } from "next";
import React from "react";
import Base from "../../components/Base";
import SimpleHeader from "../../components/header/Simple";
import LetterSection from "../../components/letter/LetterSection";
import SidebarSection from "../../components/section/SidebarSection";
import TelegramList from "../../components/telegram/TelegramList";

/**
 * The news page.
 *
 * @returns {React.ReactElement} The JSX element.
 */
const NewsPage: NextPage = () => (
  <Base
    metadata={{
      title: "Nyheter",
      description: "Senaste nytt om Södermalmsskolan.",
    }}
    leadingAd
  >
    <SimpleHeader title="Nyheter" sub="Vi är Södermalmsskolans inofficiella nyhetsbyrå." />
    <SidebarSection
      main={<LetterSection />}
      sidebar={<TelegramList />}
      sidebarTitle="Senaste nytt"
    />
  </Base>
);

export default NewsPage;
