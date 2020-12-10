import { Theme } from "@emotion/react";
import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";
import { useDish } from "../../lib/food/structures/client/Dish";
import { useMenu } from "../../lib/food/structures/client/Menu";
import { Dish } from "../../lib/food/structures/shared/Dish";
import { breakpoints, media } from "../../styles/breakpoints";
import Card from "../Card";
import Section, { SectionProps } from "../Section";
import Skeleton from "../Skeleton";
import { CardTitle } from "../text/headings";
import { SmallParagraph } from "../text/paragraphs";
import { Asterisk } from "../text/symbols";

const DishCard: FunctionComponent<{
  dish: Dish;
}> = ({ dish }) => {
  const { data } = useDish({
    id: dish?.id,
  });

  return (
    <Card
      css={{
        padding: "4rem 2rem",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CardTitle>
        {dish?.title ? (
          <>
            {dish?.title}
            {" "}
            <span css={(theme: Theme) => ({
              color: theme.color.text.tertiary,
            })}
            >
              (
              {data?.co2e?.toLocaleString() || <Skeleton width="2em" />}
              {" "}
              kg CO
              <sub>2</sub>
              e per portion)
            </span>
            &nbsp;
            <Asterisk />
          </>
        ) : (
          <Skeleton count={2} />
        )}
      </CardTitle>
    </Card>
  );
};

const MenuSection: FunctionComponent<SectionProps> = (props) => {
  const { data } = useMenu({
    limit: 1,
  });
  const lang = useLang();

  const menu = data?.[0];

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
          // While it is a bad idea to use the array index as the key, it doesn't really
          // matter when the elements aren't unique.
          <DishCard key={dish?.id || index} dish={dish} />
        ))}
      </div>
      <SmallParagraph
        css={{
          marginTop: "2rem",
        }}
      >
        <Asterisk />
        &nbsp;Källa: Sodexo.
      </SmallParagraph>
    </Section>
  );
};

export default MenuSection;
