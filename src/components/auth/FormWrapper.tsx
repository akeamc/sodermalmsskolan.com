import React from "react";
import styled from "styled-components";
import { Button } from "../basic/Button";
import * as breakpoints from "../../styles/breakpoints";
import { Card, CardContent } from "../basic/Card";
import { SmallLogo } from "../basic/Logo";

const BigContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${breakpoints.large}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Pane = styled.div``;

const LeftPane = styled(Pane)``;

const RightPane = styled(Pane)``;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const FormCard = styled(Card)`
  margin: 2rem;
  width: 100%;
  max-width: 32rem;
`;

const Logo = styled(SmallLogo)`
  width: 2rem;
  text-align: center;
  margin: 0 auto;
`;

const Headline = styled.h2`
  text-align: center;
  margin-top: 1rem;
`;

const Sub = styled.p`
  text-align: center;
  max-width: 24rem;
  margin: 1rem auto;
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
`;

export const FormWrapper: React.FunctionComponent<{
  headline: React.ReactNode;
  sub: React.ReactNode;
}> = ({ children, headline, sub }) => {
  return (
    <BigContainer>
      <LeftPane>
        <BackButtonContainer>
          <Button href="/">Tillbaka</Button>
        </BackButtonContainer>
        <FormContainer>
          <FormCard $hoverable={false}>
            <CardContent>
              <Logo />
              <Headline>{headline}</Headline>
              <Sub>{sub}</Sub>
              {children}
            </CardContent>
          </FormCard>
        </FormContainer>
      </LeftPane>
      <RightPane />
    </BigContainer>
  );
};
