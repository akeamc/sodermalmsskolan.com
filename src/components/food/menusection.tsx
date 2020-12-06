import { Theme } from "@emotion/react";
import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";
import { useDish } from "../../lib/food/structures/client/Dish";
import { useMenu } from "../../lib/food/structures/client/Menu";
import { Dish } from "../../lib/food/structures/shared/Dish";
import { breakpoints, media } from "../../styles/breakpoints";
import Card from "../card";
import Section, { SectionProps } from "../section";
import Skeleton from "../skeleton";
import { H5 } from "../text/headings";

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
      <H5>
        {dish?.title ? (
          <>
            <span
              css={(theme: Theme) => ({
                color: theme.color.text.white,
              })}
            >
              {dish?.title}
            </span>{" "}
            ({data?.co2e?.toLocaleString() || <Skeleton width="2em" />} kg CO
            <sub>2</sub>e per portion)
          </>
        ) : (
          <Skeleton count={2} />
        )}
      </H5>
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
        title: "Dagens lunch",
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
          <DishCard key={index} dish={dish} />
        ))}
      </div>
    </Section>
  );
};

MenuSection.defaultProps = {
  dark: true,
};

export default MenuSection;
