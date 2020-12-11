/* eslint-disable jsx-a11y/img-redundant-alt */
import { Theme } from "@emotion/react";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { useDishEmissions } from "../../lib/food/hooks/dish";
import { FoodPhoto, useDishPhotos } from "../../lib/food/hooks/photos";
import { ClientDish } from "../../lib/food/structures/client/Dish";
import Card, { CardProps } from "../Card";
import Skeleton from "../Skeleton";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

export interface DishCardProps extends CardProps {
  dish: ClientDish;
  showPhotos?: boolean;
}

const Photo: FunctionComponent<{photo: FoodPhoto}> = ({ photo }) => (
  <div css={(theme: Theme) => ({
    position: "relative",
    backgroundColor: theme.color.skeleton.base,
    borderRadius: "0.375rem",
    overflow: "hidden",
    width: "4rem",
    height: "4rem",
    margin: "0.5rem",
  })}
  >
    {photo?.url ? <Image src={photo?.url} layout="fill" /> : null}
  </div>
);

/**
 * Dish information.
 */
const DishCard: FunctionComponent<DishCardProps> = ({ dish, showPhotos = true, ...rest }) => {
  const { data: co2e, error: emissionsError } = useDishEmissions(dish?.id);

  const photos = useDishPhotos(dish?.id);

  return (
    <Card
      id={dish?.id}
      href={dish?.url}
      {...rest}
    >
      <CardTitle>{dish?.title || <Skeleton count={2} />}</CardTitle>
      <CardDescription>
        {emissionsError ? (
          <span css={(theme: Theme) => ({
            color: theme.color.danger,
          })}
          >
            ???
          </span>
        ) : co2e?.toLocaleString() || <Skeleton width="2em" />}
        {" "}
        kg CO
        <sub>2</sub>
        e per portion
      </CardDescription>
      {photos?.length === 0 || !showPhotos ? null
        : (
          <div css={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: rest.big ? "center" : null,
            margin: "0.5rem -0.5rem -0.5rem",
          }}
          >
            {(photos || new Array(2).fill(null))
              .map((photo, index) => <Photo photo={photo} key={photo?.id || index} />)}
          </div>
        )}
    </Card>
  );
};

export default DishCard;
