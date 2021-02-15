import React, { FunctionComponent, ReactNode } from "react";
import Container from "../Container";
import { breakpoints, media } from "../../styles/breakpoints";
import {
  SmallHeading, SubTitle,
} from "../text/headings";
import ButtonRow from "../button/row";
import HeaderProps from "./props";
import PageHeading from "../typography/hierarchy/page/PageHeading";

export interface HomeHeaderProps extends HeaderProps {
  superTitle?: ReactNode;
  buttons?: ReactNode;
  graphic: ReactNode;
}

const HomeHeader: FunctionComponent<HomeHeaderProps> = ({
  title,
  sub,
  superTitle,
  buttons,
  graphic,
}) => (
  <div
    css={{
      backgroundColor: "var(--color-bg-primary)",
    }}
  >
    <Container
      css={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "2rem",
        paddingBottom: "2rem",

        [media(breakpoints.large)]: {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "2rem 0",
          gridRow: 2,

          [media(breakpoints.medium)]: {
            paddingTop: "4rem",
            paddingBottom: "4rem",
          },

          [media(breakpoints.large)]: {
            paddingTop: "8rem",
            paddingBottom: "8rem",
            gridRow: 1,
          },
        }}
      >
        {superTitle ? (
          <SmallHeading css={{ marginBottom: "0.25rem" }}>
            {superTitle}
          </SmallHeading>
        ) : null}
        <PageHeading>{title}</PageHeading>
        {sub ? <SubTitle>{sub}</SubTitle> : null}
        {buttons ? (
          <ButtonRow css={{
            marginTop: "2rem",
          }}
          >
            {buttons}
          </ButtonRow>
        ) : null}
      </div>
      <div
        css={{
          position: "relative",
          minHeight: "50vh",
          marginTop: "2rem",

          [media(breakpoints.large)]: {
            minHeight: "70vh",
            marginBottom: "2rem",
          },

          img: {
            objectFit: "cover",
          },
        }}
      >
        {graphic}
      </div>
    </Container>
  </div>
);

export default HomeHeader;
