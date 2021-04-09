import React, { FunctionComponent } from "react";
import useTodaysMenu from "../../lib/food/hooks/useTodaysMenu";
import Card from "../Card";

/**
 * A card displaying the menu.
 *
 * @returns {React.ReactElement} The rendered card.
 */
const MenuCard: FunctionComponent = () => {
  const menu = useTodaysMenu();

  return (
    <Card variant="colorful">
      <ul>
        {menu?.dishes?.map((dish) => <li key={dish.id}>{dish.title}</li>)}
      </ul>
    </Card>
  );
};

export default MenuCard;
