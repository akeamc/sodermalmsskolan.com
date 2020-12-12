import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";
import { useDayMenu } from "../../lib/food/hooks/menu";
import { breakpoints, media } from "../../styles/breakpoints";
import DishCard from "../dishes/DishCard";
import Section, { SectionProps } from "../Section";
import Skeleton from "../Skeleton";
import { SmallParagraph } from "../text/paragraphs";

const DayMenuSection: FunctionComponent<SectionProps> = (props) => {
  const menu = useDayMenu();
  const lang = useLang();

  return (
    <Section
      header={{
        superTitle: menu?.date ? (
          dayjs(menu?.date).locale(lang).format("dddd D MMMM")
        ) : (
          <Skeleton width="12em" />
        ),
        title: (
          <>
            Dagens lunch
          </>
        ),
        promo: true,
      }}
      {...props}
    >
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",

          [media(breakpoints.medium)]: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
        }}
      >
        {(menu?.dishes || new Array(2).fill(null)).map((dish, index) => (
          <DishCard key={dish?.id || index} dish={dish} big />
        ))}
      </div>
      <SmallParagraph
        css={{
          marginTop: "2rem",
        }}
      >
        Källa: Sodexo.
      </SmallParagraph>
    </Section>
  );
};

export default DayMenuSection;
