import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import { ClientDish } from "../../lib/food/structures/client/Dish";
import ClientMenu from "../../lib/food/structures/client/Menu";
import CardAd from "../ads/CardAd";
import DishCard from "../dishes/DishCard";
import CardGrid from "../grid/CardGrid";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { SmallHeading } from "../text/headings";

export interface MenuProps {
  menu?: ClientMenu;
  ad?: boolean;
}

interface MenuTitleProps {
  date: Date;
}

interface MenuDishesProps {
  dishes: ClientDish[];
}

/**
 * Text showing the title of a menu, i.e. the date.
 *
 * @param {React.PropsWithChildren<MenuTitleProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered props.
 */
const MenuTitle: FunctionComponent<MenuTitleProps> = ({
  date,
}) => {
  const { language } = useLocale();

  return (
    <>
      {date ? dayjs(date).locale(language).format("dddd D MMMM") : <InlineSkeleton height="100%" />}
    </>
  );
};

/**
 * Dishes, displayed neatly.
 *
 * @param {React.PropsWithChildren<MenuDishesProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered dishes.
 */
const MenuDishes: FunctionComponent<MenuDishesProps> = ({
  dishes,
}) => (
  <>
    {(dishes || new Array(2).fill(null))
      .map((dish, index) => <DishCard dish={dish} key={dish?.id || index} />)}
  </>
);

/**
 * A menu, displaying dishes served on a particular day.
 *
 * @param {React.PropsWithChildren<MenuProps>} props Menu props.
 *
 * @returns {React.ReactElement} Rendered menu.
 */
const Menu: FunctionComponent<MenuProps> = ({ menu, ad = false }) => (
  <div css={{
    display: "flex",
  }}
  >
    <div css={{
      position: "relative",
    }}
    >
      <SmallHeading
        css={{
          writingMode: "vertical-lr",
          marginRight: "1rem",
          lineHeight: 1,
          position: "sticky",
          top: "calc(var(--navbar-height) + 1rem)",
        }}
      >
        {ad ? "Annons" : <MenuTitle date={menu?.date} />}
      </SmallHeading>
    </div>
    {ad ? (
      <div css={{
        flex: 1,
      }}
      >
        <CardAd />
      </div>
    ) : (
      <CardGrid css={{
        flex: 1,
      }}
      >
        <MenuDishes dishes={menu?.dishes} />
      </CardGrid>
    )}
  </div>
);

export default Menu;
