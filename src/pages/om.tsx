import React from "react";
import { Layout } from "../components/layout/Layout";
import { Link } from "../components/basic/Link";
import { Navigation } from "../components/layout/Navigation";
import { Base } from "../components/grid/Row";
import { Hero } from "../components/layout/Hero";
import { NormalWidth } from "../components/grid/Col";
import { Image } from "../components/basic/Image";
import { Section } from "../components/layout/Section";
import styled from "styled-components";

const TextBox = styled.div`
  text-align: center;

  h1 {
    margin-bottom: 32px;
  }
`;

const Page: React.FunctionComponent = () => {
  const image =
    "https://blogg.södermalmsskolan.com/content/images/size/w2000/2020/06/51B4F6D2-3A27-4358-9D00-BC57E8C01774.jpeg";

  return (
    <Layout metadata={{ title: "Om", images: [image] }}>
      <Navigation />
      <Hero>
        <Base>
          <NormalWidth>
            <Image src={image} />
          </NormalWidth>
        </Base>
      </Hero>
      <Section>
        <Base>
          <NormalWidth>
            <TextBox>
              <h1>Bakgrund</h1>
              <p>
                Södermalmsskolan.com grundades i maj 2019 av Bo Strömberg och
                Åke Amcoff. Än idag är det nästan bara de som lägger tid på
                projektet. Vi startade med en vision – idéen att bilder på
                Sodexos fantastiska, gudomliga mat skulle vara offentliga och
                integrerade med en lättåtkomlig meny.
              </p>
              <p>
                Det tog dock inte lång tid innan vi började med en blogg. Först
                ut var en artikel om oss, kallad Om oss, och{" "}
                <Link href="/blogg/problemet-med-skolmaten">
                  en artikel om matproblemet
                </Link>{" "}
                som renoverats mycket sedan den publicerades.
              </p>
            </TextBox>
          </NormalWidth>
        </Base>
      </Section>
    </Layout>
  );
};

export default Page;
