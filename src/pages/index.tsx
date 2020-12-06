import React from "react";
import Base from "../components/base";
import HomeHeader from "../components/header/home";
import Image from "next/image";
import styled from "@emotion/styled";
import Button from "../components/button";
import Container from "../components/container";
import Card from "../components/card";
import Section from "../components/section";
import { H5 } from "../components/text/headings";
import MenuSection from "../components/food/menusection";

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

const Page: React.FunctionComponent = () => {
  return (
    <Base>
      <HomeHeader
        superTitle="södermalmsskolan.com"
        title="Snille och smak"
        sub="Södermalmsskolan, ofiltrerad."
        buttons={
          <>
            <Button primary href="/meny">
              Visa menyn
            </Button>
            <Button href="/">Något annat</Button>
          </>
        }
        graphic={
          <GroovyImage
            src="https://blogg.xn--sdermalmsskolan-8sb.com/content/images/2020/08/DSC02558.JPG"
            layout="fill"
          />
        }
      />
      <MenuSection />
    </Base>
  );
};

export default Page;
