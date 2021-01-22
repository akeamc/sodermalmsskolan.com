import React, { FunctionComponent, useMemo } from "react";
import { useDishes } from "../../lib/food/structures/client/Dish";
import CardGrid from "../grid/CardGrid";
import Section, { SectionProps } from "../section/Section";
import DishCard from "./DishCard";

/**
 * A section displaying all dishes.
 *
 * @param {React.PropsWithChildren<SectionProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered dish section.
 */
const DishSection: FunctionComponent<SectionProps> = ({ ...sectionProps }) => {
  const { data } = useDishes();

  const dishes = useMemo(() => (
    data?.sort((a, b) => a.title.localeCompare(b.title))
  ), [data]);

  return (
    <Section {...sectionProps}>
      <CardGrid>
        {(dishes ?? new Array(30).fill(null))
          .map((dish, index) => <DishCard dish={dish} key={dish?.id ?? index} />)}
      </CardGrid>
    </Section>
  );
};

export default DishSection;
