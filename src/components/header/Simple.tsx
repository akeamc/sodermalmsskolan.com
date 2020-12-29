import React, { FunctionComponent } from "react";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import { sectionPaddingStyles } from "../section/Section";
import { HeaderHeading, SubTitle } from "../text/headings";
import HeaderProps from "./props";

export type SimpleHeaderProps = HeaderProps;

const SimpleHeader: FunctionComponent<SimpleHeaderProps> = ({ title, sub }) => (
  <>
    <header
      css={[
        sectionPaddingStyles.bottom,
        {
          background: "transparent",
          paddingTop: "2rem",

          [media(breakpoints.small)]: {
            paddingTop: "5rem",
          },
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
  </>
);

export default SimpleHeader;
