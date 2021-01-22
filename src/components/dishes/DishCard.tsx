/* eslint-disable jsx-a11y/img-redundant-alt */
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { useDishEmissions } from "../../lib/food/hooks/dish";
import { FoodPhoto, useDishPhotos } from "../../lib/food/hooks/photos";
import { ClientDish } from "../../lib/food/structures/client/Dish";
import Card, { CardProps } from "../Card";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { skeletonBackground } from "../skeleton/Skeleton";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

export interface DishCardProps extends CardProps {
  dish: ClientDish;
  showPhotos?: boolean;
}

interface PhotoProps {
  photo: FoodPhoto;
}

/**
 * Dish photo with small dimensions to reduce data usage and increase responsiveness.
 *
 * @param {React.PropsWithChildren<PhotoProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered photo.
 */
const Photo: FunctionComponent<PhotoProps> = ({ photo }) => (
  <div css={[skeletonBackground, {
    position: "relative",
    borderRadius: "0.375rem",
    overflow: "hidden",
    width: "4rem",
    height: "4rem",
    margin: "var(--photo-spacing)",
  }]}
  >
    {photo?.url ? (
      <Image
        src={photo?.url}
        objectFit="cover"
        width={128}
        height={128}
      />
    ) : null}
  </div>
);

/**
 * Dish information.
 *
 * @param {React.PropsWithChildren<DishCardProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered card.
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
      <CardTitle>{dish?.title ?? <InlineSkeleton count={2} />}</CardTitle>
      <CardDescription>
        {emissionsError ? (
          <span css={{
            color: "var(--color-text-danger)",
          }}
          >
            ???
          </span>
        ) : co2e?.toLocaleString() ?? <InlineSkeleton width="2em" />}
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
            "--photo-spacing": "0.25rem",
            margin: "0.5rem calc(-1 * var(--photo-spacing)) calc(-1 * var(--photo-spacing))",
          }}
          >
            {(photos ?? new Array(2).fill(null))
              .map((photo, index) => <Photo photo={photo} key={photo?.id ?? index} />)}
          </div>
        )}
    </Card>
  );
};

export default DishCard;
