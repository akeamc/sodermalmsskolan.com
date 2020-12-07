import React, { FunctionComponent, ReactNode } from "react";
import { Theme, ThemeProvider } from "@emotion/react";
import Container from "../Container";
import { breakpoints, media } from "../../styles/breakpoints";
import { HeaderHeading, SmallHeading, SubTitle } from "../text/headings";
import darkTheme from "../../styles/theme/dark";
import ButtonRow from "../button/row";
import Divider from "../divider";
import HeaderProps from "./props";

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
  <ThemeProvider theme={darkTheme}>
    <div
      css={(theme: Theme) => ({
        backgroundColor: theme.color.background,
      })}
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

            [media(breakpoints.medium)]: {
              paddingTop: "4rem",
              paddingBottom: "4rem",
            },

            [media(breakpoints.large)]: {
              paddingTop: "8rem",
              paddingBottom: "8rem",
            },
          }}
        >
          {superTitle ? (
            <SmallHeading css={{ marginBottom: "0.25rem" }}>
              {superTitle}
            </SmallHeading>
          ) : null}
          <HeaderHeading>{title}</HeaderHeading>
          {sub ? <SubTitle>{sub}</SubTitle> : null}
          {buttons ? <ButtonRow>{buttons}</ButtonRow> : null}
        </div>
        <div
          css={{
            position: "relative",
            minHeight: "50vh",

            [media(breakpoints.large)]: {
              minHeight: "80vh",
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
    <Divider />
  </ThemeProvider>
);

export default HomeHeader;
