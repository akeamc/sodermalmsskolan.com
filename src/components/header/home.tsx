import React, { FunctionComponent, ReactNode } from "react";
import styled from "@emotion/styled";
import Container from "../container";
import { breakpoints, media } from "../../styles/breakpoints";
import { HeroHeading, SmallHeading } from "../text/headings";
import { ThemeProvider } from "@emotion/react";
import darkTheme from "../../styles/theme/dark";
import ButtonRow from "../button/row";
import Separator from "../separator";

export interface HomeHeaderProps {
  title: ReactNode;
  sub?: ReactNode;
  superTitle?: ReactNode;
  buttons?: ReactNode;
  graphic: ReactNode;
}

const Outer = styled.div`
  background-color: ${({ theme }) => theme.color.background};
`;

const StyledHomeHeader = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;

  ${media(breakpoints.large)} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Pane = styled.div``;

const TextPane = styled(Pane)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 0;
`;

const GraphicPane = styled(Pane)`
  position: relative;
  min-height: 50vh;

  ${media(breakpoints.large)} {
    min-height: 80vh;
  }

  img {
    object-fit: cover;
  }
`;

const Title = styled(HeroHeading)`
  font-size: 4.5rem;
  font-weight: 800;
`;

const Sub = styled.h4`
  margin: 0;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.color.text.secondary};
`;

const SuperTitle = styled(SmallHeading)`
  margin-bottom: 0.25rem;
`;

const HomeHeader: FunctionComponent<HomeHeaderProps> = ({
  title,
  sub,
  superTitle,
  buttons,
  graphic,
}) => (
  <ThemeProvider theme={darkTheme}>
    <Outer>
      <StyledHomeHeader>
        <TextPane>
          {superTitle ? <SuperTitle>{superTitle}</SuperTitle> : null}
          <Title>{title}</Title>
          {sub ? <Sub>{sub}</Sub> : null}
          {buttons ? <ButtonRow>{buttons}</ButtonRow> : null}
        </TextPane>
        <GraphicPane>{graphic}</GraphicPane>
      </StyledHomeHeader>
    </Outer>
    <Separator />
  </ThemeProvider>
);

export default HomeHeader;
