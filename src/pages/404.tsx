import { Layout } from "../components/basic/Layout";
import { Navigation } from "../components/layout/Navigation";
import styled from "styled-components";
import React from "react";

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--navigation-height));
  position: relative;
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  h1 {
    color: var(--background);
    text-shadow: var(--shadow-large);
    --size-sm: 16em;
    --size-md: 24em;
    --size-lg: 30vw;
    line-height: 1;
    margin: 0;
    user-select: none;
    font-weight: 600;
    font-feature-settings: "tnum", "ss01", "ss02";
  }
`;

const TitleContainer = styled.div`
  margin: var(--section-spacing) 0;
  text-align: center;
  z-index: 1;

  h1 {
    margin-bottom: 0.625rem;
  }
`;

const Page: React.FunctionComponent = () => {
  return (
    <Layout metadata={{ title: "Sidan hittades inte" }}>
      <Navigation />
      <Main>
        <BackgroundWrapper>
          <h1>404</h1>
        </BackgroundWrapper>
        <TitleContainer>
          <h4>Sidan hittades inte</h4>
        </TitleContainer>
      </Main>
    </Layout>
  );
};

export default Page;
