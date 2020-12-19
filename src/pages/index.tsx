import React, { FunctionComponent } from "react";
import Image from "next/image";
import { NextPage } from "next";
import Base from "../components/Base";
import HomeHeader from "../components/header/Home";
import Button from "../components/button/Button";
import DayMenuSection from "../components/menu/DayMenuSection";
import Footer from "../components/footer/Footer";
import PostListSection from "../components/blog/PostListSection";
import { useDayMenu } from "../lib/food/hooks/menu";
import { useDishPhotos } from "../lib/food/hooks/photos";
import DigibruhArticleSection from "../components/digibruh/Section";

const HomeImage: FunctionComponent = () => {
  const { data } = useDayMenu();

  const dish = data?.dishes?.[0];

  const photos = useDishPhotos(dish?.id);

  const src = photos?.[0]?.url || "https://blogg.xn--sdermalmsskolan-8sb.com/content/images/2020/08/DSC02558.JPG";

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

const Page: NextPage = () => (
  <Base>
    <HomeHeader
      superTitle="södermalmsskolan.com"
      title="Snille och smak"
      sub="Södermalmsskolan, ofiltrerad."
      buttons={(
        <>
          <Button primary href="/meny">
            Visa menyn
          </Button>
          <Button href="/">Något annat</Button>
        </>
        )}
      graphic={(
        <HomeImage />
        )}
    />
    <DayMenuSection />
    <PostListSection
      header={{
        superTitle: "Blogg",
        title: "Senaste inläggen",
        promo: true,
      }}
      limit={6}
      showMoreButton
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
    <Footer />
  </Base>
);

export default Page;
