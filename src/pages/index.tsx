import React, { FunctionComponent } from "react";
import Image from "next/image";
import { NextPage } from "next";
import Base from "../components/Base";
import HomeHeader from "../components/header/Home";
import Button from "../components/button/Button";
import DayMenuSection from "../components/menu/DayMenuSection";
import { useDayMenu } from "../lib/food/hooks/menu";
import { useDishPhotos } from "../lib/food/hooks/photos";
import DigibruhArticleSection from "../components/digibruh/Section";
import FeaturedPostSection from "../components/blog/FeaturedPostSection";

/**
 * Image shown on the home page.
 *
 * @returns {React.ReactElement} JSX element.
 */
const HomeImage: FunctionComponent = () => {
  const { data } = useDayMenu();

  const dish = data?.dishes?.[0];

  const photos = useDishPhotos(dish?.id);

  const src = photos?.[0]?.url ?? "https://blogg.xn--sdermalmsskolan-8sb.com/content/images/2020/08/DSC02558.JPG";

  return (
    <Image
      src={src}
      css={{
        borderRadius: "0.5rem",
      }}
      layout="fill"
    />
  );
};

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
      graphic={(
        <HomeImage />
        )}
    />
    <DayMenuSection />
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
