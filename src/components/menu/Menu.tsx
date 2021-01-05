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

const MenuTitle: FunctionComponent<{
  date: Date;
}> = ({
  date,
}) => {
  const { language } = useLocale();

  return (
    <>
      {date ? dayjs(date).locale(language).format("dddd D MMMM") : <InlineSkeleton height="100%" />}
    </>
  );
};

const MenuDishes: FunctionComponent<{
  dishes: ClientDish[]
}> = ({
  dishes,
}) => (
  <>
    {(dishes || new Array(2).fill(null))
      .map((dish, index) => <DishCard dish={dish} key={dish?.id || index} />)}
  </>
);

const Menu: FunctionComponent<MenuProps> = ({ menu, ad = false }) => (
  <div css={{
    display: "flex",
  }}
  >
    <SmallHeading
      css={{
        writingMode: "vertical-lr",
        marginRight: "1rem",
        lineHeight: 1,
      }}
    >
      {ad ? "Annons" : <MenuTitle date={menu?.date} />}
    </SmallHeading>
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
