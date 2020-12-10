import React, { FunctionComponent } from "react";
import { ClientDish, useDish } from "../../lib/food/structures/client/Dish";
import Card, { CardProps } from "../Card";
import Skeleton from "../Skeleton";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

export interface DishCardProps extends CardProps {
  dish: ClientDish;
}

/**
 * Dish information.
 */
const DishCard: FunctionComponent<DishCardProps> = ({ dish, ...rest }) => {
  const { data, error } = useDish({ id: dish?.id });

  return (
    <Card
      id={dish?.id}
      href={dish?.url}
      {...rest}
    >
      <CardTitle>{dish?.title || <Skeleton count={2} />}</CardTitle>
      <CardDescription>
        {error ? "Ingen information." : (
          <>
            {data?.co2e?.toLocaleString() || <Skeleton width="2em" />}
            {" "}
            kg CO
            <sub>2</sub>
            e per portion
          </>
        )}
      </CardDescription>
    </Card>
  );
};

export default DishCard;
