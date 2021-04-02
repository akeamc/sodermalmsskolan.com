import React, { Fragment, FunctionComponent } from "react";
import { useMenu } from "../../lib/food/hooks/useMenus";
import Section, { SectionProps } from "../section/Section";
import Menu from "./Menu";

export interface MenuSectionProps extends SectionProps {
  limit?: number;
}

/**
 * Section displaying the menu. Simple enough.
 *
 * @param {React.PropsWithChildren<MenuSectionProps>} props The props.
 *
 * @returns {React.ReactElement} Rendered section.
 */
const MenuSection: FunctionComponent<MenuSectionProps> = ({ limit = 30, ...sectionProps }) => {
  const { data } = useMenu({
    limit,
  });

  return (
    <Section
      containerProps={{
        width: "wide",
      }}
      {...sectionProps}
    >
      <div css={{
        display: "grid",
        gap: "2rem",
      }}
      >
        {(data ?? new Array(limit).fill(null))
          .map((menu, index) => (
            <Fragment key={menu?.date?.getTime() ?? index}>
              {index % 3 === 0 ? <Menu ad /> : null}
              <Menu menu={menu} />
            </Fragment>
          ))}
      </div>
    </Section>
  );
};

export default MenuSection;
