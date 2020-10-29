import { Hero } from ".";
import React from "react";
import { Base } from "../../grid/Base";
import styled from "styled-components";
import * as breakpoints from "../../../styles/breakpoints";
import { ButtonRow } from "../../basic/Button";

const EpicHeroPane = styled.div`
  grid-column-end: span 12;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${breakpoints.small}) {
    grid-column-end: span 10;
  }

  @media (min-width: ${breakpoints.large}) {
    grid-column-end: span 5;
  }

  h1 {
    line-height: 1.1;
    letter-spacing: -0.04em;
    font-weight: 700;

    --size-sm: 3rem;
    --size-md: 4rem;
    --size-lg: 5rem;
    --size-xl: 6rem;
  }

  ${ButtonRow} {
    margin-top: 1rem;
  }
`;

const LeftPane = styled(EpicHeroPane)`
  grid-column-start: 1;

  @media (min-width: ${breakpoints.small}) {
    grid-column-start: 2;
  }
`;

const RightPane = styled(EpicHeroPane)``;

export const EpicHero: React.FunctionComponent<{
  left?: React.ReactNode;
  right?: React.ReactNode;
}> = ({ left, right }) => {
  return (
    <Hero>
      <Base>
        <LeftPane>{left}</LeftPane>
        <RightPane>{right}</RightPane>
      </Base>
    </Hero>
  );
};
