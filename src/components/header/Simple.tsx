import React, { FunctionComponent } from "react";
import Container from "../Container";
import { sectionPaddingStyles } from "../Section";
import { HeaderHeading, SubTitle } from "../text/headings";
import HeaderProps from "./props";

export type SimpleHeaderProps = HeaderProps;

const SimpleHeader: FunctionComponent<SimpleHeaderProps> = ({ title, sub }) => (
  <header
    css={[
      sectionPaddingStyles.bottom,
      {
        paddingTop: "5rem",
        background: "transparent",
      },
    ]}
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
