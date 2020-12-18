import React, { FunctionComponent } from "react";
import { useMenu } from "../../lib/food/structures/client/Menu";
import Section, { SectionProps } from "../section/Section";
import Menu from "./Menu";

export interface MenuSectionProps extends SectionProps {
  limit?: number;
}

const MenuSection: FunctionComponent<MenuSectionProps> = ({ limit = 90, ...sectionProps }) => {
  const { data } = useMenu({
    limit,
  });

  return (
    <Section {...sectionProps}>
      <div css={{
        display: "grid",
        gap: "2rem",
      }}
      >
        {(data || new Array(limit).fill(null))
          .map((menu, index) => <Menu menu={menu} key={menu?.date?.getTime() || index} />)}
      </div>
    </Section>
  );
};

export default MenuSection;
