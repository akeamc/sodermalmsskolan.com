import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import { useDayMenu } from "../../lib/food/hooks/menu";
import { breakpoints, media } from "../../styles/breakpoints";
import DishCard from "../dishes/DishCard";
import Section, { SectionProps } from "../section/Section";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { SmallParagraph } from "../text/paragraphs";

const DayMenuSection: FunctionComponent<SectionProps> = (props) => {
  const { data, loading } = useDayMenu();
  const { language } = useLocale();

  const dishes = data?.dishes ?? (loading ? new Array(2).fill(null) : null);

  const fallbackSuper = loading ? <InlineSkeleton width="12em" /> : null;

  return (
    <Section
      header={{
        superTitle: data?.date ? (
          dayjs(data?.date).locale(language).format("dddd D MMMM")
        ) : fallbackSuper,
        title: "Dagens lunch",
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
        {dishes?.map((dish, index) => (
          <DishCard key={dish?.id ?? index} dish={dish} big />
        )) ?? <SmallParagraph>Menyn är inte tillgänglig.</SmallParagraph>}
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
