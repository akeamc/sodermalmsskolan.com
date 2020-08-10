import { Layout } from "../components/basic/Layout";
import { Navigation } from "../components/basic/Navigation";
import styled from "styled-components";
import { useState } from "react";
import React from "react";
import { useWindowSize } from "../lib/hooks/windowsize";
import { wrap } from "module";

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--navigation-height));
  position: relative;
`;

const TitleContainer = styled.div`
  margin: var(--section-spacing) 0;
  text-align: center;
  z-index: 1;

  h1 {
    margin-bottom: 0.625rem;
  }
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--accents-5);

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Background: React.FunctionComponent = () => {
  const wrapperRef = React.createRef<HTMLDivElement>();
  const canvasRef = React.createRef<HTMLCanvasElement>();
  useWindowSize();

  const wrapperRect = wrapperRef.current?.getBoundingClientRect();
  const canvasWidth = wrapperRect?.width || 0;
  const canvasHeight = wrapperRect?.height || 0;

  const getContext = () => {
    return canvasRef.current?.getContext("2d");
  };

  const draw = () => {
    const ctx = getContext();

    if (ctx) {
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
  };

  setInterval(draw, 100);

  return (
    <BackgroundWrapper ref={wrapperRef}>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </BackgroundWrapper>
  );
};

const Page: React.FunctionComponent = () => {
  return (
    <Layout metadata={{ title: "Sidan hittades inte" }}>
      <Navigation />
      <Main>
        <Background />
        <TitleContainer>
          <h1>404</h1>
          <h4>Sidan hittades inte</h4>
        </TitleContainer>
      </Main>
    </Layout>
  );
};

export default Page;
