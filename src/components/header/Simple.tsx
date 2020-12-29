import React, { FunctionComponent } from "react";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import { HeaderHeading, SubTitle } from "../text/headings";
import HeaderProps from "./props";

export type SimpleHeaderProps = HeaderProps;

const SimpleHeader: FunctionComponent<SimpleHeaderProps> = ({ title, sub }) => (
  <header
    css={{
      padding: "var(--header-padding)",

      [media(breakpoints.small)]: {
        paddingTop: "5rem",
      },
    }}
  >
    <Container>
      <HeaderHeading>{title}</HeaderHeading>
      {sub ? (
        <SubTitle
          css={{
            maxWidth: "480px",
          }}
        >
          {sub}
        </SubTitle>
      ) : null}
    </Container>
  </header>
);

export default SimpleHeader;
