import React, { FunctionComponent, useMemo } from "react";
import { useDishes } from "../../lib/food/structures/client/Dish";
import CardGrid from "../grid/CardGrid";
import Section, { SectionProps } from "../Section";
import DishCard from "./DishCard";

const DishSection: FunctionComponent<SectionProps> = ({ ...sectionProps }) => {
  const { data } = useDishes();

  const dishes = useMemo(() => (
    data?.sort((a, b) => a.title.localeCompare(b.title))
  ), [data]);

  return (
    <Section {...sectionProps}>
      <CardGrid>
        {(dishes || new Array(30).fill(null))
          .map((dish) => <DishCard dish={dish} key={dish?.id} />)}
      </CardGrid>
    </Section>
  );
};

export default DishSection;
