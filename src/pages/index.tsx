import React from "react";
import { NextPage } from "next";
import Base from "../components/Base";
import HomeHeader from "../components/header/Home";
import Button from "../components/old-button/Button";
import DigibruhArticleSection from "../components/digibruh/Section";
import FeaturedPostSection from "../components/blog/FeaturedPostSection";

/**
 * The home page of [södermalmsskolan.com](https://södermalmsskolan.com).
 *
 * @returns {React.ReactElement} JSX element.
 */
const HomePage: NextPage = () => (
  <Base leadingAd>
    <HomeHeader
      superTitle="södermalmsskolan.com"
      title="Snille och smak"
      sub="Södermalmsskolan, ofiltrerad."
      buttons={(
        <>
          <Button primary href="/meny">
            Visa menyn
          </Button>
          <Button href="/schema">Visa schemat</Button>
        </>
        )}
      graphic={<code>404</code>}
    />
    <FeaturedPostSection
      header={{
        superTitle: "Blogg",
        title: "Utvalda inlägg",
        promo: true,
      }}
    />
    <DigibruhArticleSection
      header={{
        title: "Ett bruh-urval",
        superTitle: "Digibruh",
        promo: true,
      }}
      limit={6}
      showMoreButton
    />
  </Base>
);

export default HomePage;
