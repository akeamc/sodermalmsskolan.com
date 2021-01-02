import React, { Fragment, FunctionComponent } from "react";
import { useMenu } from "../../lib/food/hooks/menu";
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
          .map((menu, index) => (
            <Fragment key={menu?.date?.getTime() || index}>
              {index % 3 === 0 ? <Menu ad /> : null}
              <Menu menu={menu} />
            </Fragment>
          ))}
      </div>
    </Section>
  );
};

export default MenuSection;
