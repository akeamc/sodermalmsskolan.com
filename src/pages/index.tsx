import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { NextPage } from "next";
import Base from "../components/Base";
import HomeHeader from "../components/header/Home";
import Button from "../components/button/Button";
import MenuSection from "../components/menu/Section";
import Footer from "../components/footer/Footer";
import PostListSection from "../components/blog/PostListSection";

const GroovyImage = styled(Image)`
  filter: hue-rotate(180deg);
  transition: all 0.2s ease-in-out;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

  &:hover {
    clip-path: polygon(
      2rem 2rem,
      calc(100% - 2rem) 2rem,
      calc(100% - 2rem) calc(100% - 2rem),
      2rem calc(100% - 2rem)
    );
  }
`;

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
        <GroovyImage
          src="https://blogg.xn--sdermalmsskolan-8sb.com/content/images/2020/08/DSC02558.JPG"
          layout="fill"
        />
        )}
    />
    <MenuSection />
    <PostListSection
      dark
      upperDivider
      header={{
        superTitle: "Blogg",
        title: "Senaste inläggen",
      }}
      limit={6}
      showMoreButton
    />
    <Footer />
  </Base>
);

export default Page;
