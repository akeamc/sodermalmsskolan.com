import React from "react";
import { DefaultLayout } from "../components/layout/Layout/Default";
import { Navigation } from "../components/layout/Navigation";
import { Base } from "../components/grid/Base";
import { Hero } from "../components/layout/Hero";
import { NormalWidth } from "../components/grid/Col";
import styled from "styled-components";
import { Anchor, Muted } from "../components/basic/Typography";
import { SmallLogo } from "../components/basic/Logo";
import Link from "next/link";

const TextBox = styled.div`
  text-align: center;
`;

const Logo = styled(SmallLogo)`
  margin: 1rem 0;
  display: inline-block;
  width: 2rem;
`;

const Page: React.FunctionComponent = () => {
  const image =
    "https://blogg.södermalmsskolan.com/content/images/size/w2000/2020/06/51B4F6D2-3A27-4358-9D00-BC57E8C01774.jpeg";

  return (
    <DefaultLayout metadata={{ title: "Om", images: [image] }}>
      <Navigation />
      <Hero>
        <Base>
          <NormalWidth>
            <TextBox>
              <Logo />
              <Muted>
                södermalmsskolan.com grundades i maj 2019 av Bo Strömberg och
                Åke Amcoff i protest mot maten som serveras av Sodexo.
              </Muted>
              <Muted>
                Vi är en ofrivilligt icke-vinstdrivande organisation. Vi har
                tagit emot ett antal donationer som vi är oerhört tacksamma för.
              </Muted>
              <Muted>
                Om du har frågor, förslag eller bara vill säga hej – kontakta
                oss! Du når oss enklast via{" "}
                <Link
                  href={"https://instagram.com/sodermalmsskolan.c0m"}
                  passHref
                >
                  <Anchor>Instagram</Anchor>
                </Link>{" "}
                men ibland kollar vi även mejlen:{" "}
                <Anchor href="mailto:ake.amcoff@xn--sdermalmsskolan-8sb.com">
                  ake.amcoff@södermalmsskolan.com
                </Anchor>
                .
              </Muted>
              <Muted>
                Vi värnar om open source. Därför finns{" "}
                <Link
                  href="https://github.com/ThePicoNerd/sodermalmsskolan.com"
                  passHref
                >
                  <Anchor>all källkod</Anchor>
                </Link>{" "}
                på GitHub.
              </Muted>
            </TextBox>
          </NormalWidth>
        </Base>
      </Hero>
    </DefaultLayout>
  );
};

export default Page;
