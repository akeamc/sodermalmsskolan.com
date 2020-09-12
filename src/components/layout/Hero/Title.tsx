import styled from "styled-components";
import { Hero } from ".";
import { Row } from "../../grid/Row";
import { NormalWidth } from "../../grid/Col";
import { LeadText } from "../../basic/Typography";
import * as breakpoints from "../../../styles/breakpoints";
import React from "react";

/**
 * A title container used on the top of pages. Recommended to be used with `h1` and `LeadText`.
 */
export const TitleContainer = styled.div<{ center?: boolean }>`
  ${({ center }) =>
    center &&
    `
    text-align: center;
  `}

  h1 {
    --size-lg: 4.5rem;
    --size-md: 4rem;
    --size-sm: 2.5rem;
    margin-bottom: 24px;

    @media (min-width: ${breakpoints.medium}) {
      margin-bottom: 56px;
    }
  }

  ${LeadText} {
    margin: 24px 0;

    @media (min-width: ${breakpoints.medium}) {
      margin: 48px 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const HeroWithTitle: React.FunctionComponent<{
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ title, lead, children }) => (
  <Hero>
    <Row>
      <NormalWidth>
        <TitleContainer center>
          <h1>{title}</h1>
          {lead && <LeadText>{lead}</LeadText>}
          {children}
        </TitleContainer>
      </NormalWidth>
    </Row>
  </Hero>
);
