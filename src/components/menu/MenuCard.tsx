import React, { FunctionComponent } from "react";
import useTodaysMenu from "../../lib/food/hooks/useTodaysMenu";
import { ClientDish } from "../../lib/food/structures/client/Dish";
import Card from "../Card";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import styles from "./MenuCard.module.scss";

/**
 * A card displaying the menu.
 *
 * @returns {React.ReactElement} The rendered card.
 */
const MenuCard: FunctionComponent = () => {
  const menu = useTodaysMenu();
  const dishes: ClientDish[] = menu?.dishes ?? Array.from({
    length: 2,
  }).map(() => null);

  return (
    <Card variant="colorful">
      <ul className={styles.list}>
        {dishes?.map((dish, index) => (
          <li key={dish?.id ?? index}>
            {dish?.title ?? <InlineSkeleton count={3} />}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default MenuCard;
