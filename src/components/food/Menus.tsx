import styled from "styled-components";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Base } from "../grid/Base";
import { Col } from "../grid/Col";
import * as breakpoints from "../../styles/breakpoints";
import { ClientMenu } from "../../lib/food/structures/client/Menu";
import { Dish } from "../../lib/food/structures/shared/Dish";
import { ClientDish } from "../../lib/food/structures/client/Dish";
import { useLocale } from "../../hooks/locale";
import { Card, CardContent, CardTitle } from "../basic/Card";
import { AnimateSharedLayout } from "framer-motion";

const DishList = styled.ul`
  margin-top: 1rem;
  margin-bottom: 0;

  li:last-child {
    margin-bottom: 0;
  }
`;

const DishEmissions: React.FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = ClientDish.use(id);
  const { locale } = useLocale();

  return (
    <span>
      ({data?.co2e.toLocaleString(locale) || <Skeleton width={32} />} kg CO₂e
      per portion)
    </span>
  );
};

const DishItem: React.FunctionComponent<{ dish: Dish }> = ({ dish }) => {
  return (
    <li>
      {dish ? (
        <>
          {dish?.title} <DishEmissions id={dish?.id} />
        </>
      ) : (
        <Skeleton count={2} />
      )}
    </li>
  );
};

const MenuCard: React.FunctionComponent<{
  menu: ClientMenu;
  onClick?: () => void;
}> = ({ menu, onClick }) => {
  const fallback = new Array(2).fill(null);

  return (
    <Card layoutId={menu?.id} onClick={onClick} $hoverable={false}>
      <CardContent>
        <CardTitle>{menu?.title || <Skeleton />}</CardTitle>
        <DishList>
          {(menu?.dishes || fallback).map((dish, index) => (
            <DishItem key={index} dish={dish} />
          ))}
        </DishList>
      </CardContent>
    </Card>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--grid-gap);

  @media (min-width: ${breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.large}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MenuList: React.FunctionComponent<{
  limit: number;
}> = ({ limit }) => {
  const { data } = ClientMenu.use({ limit });
  const fallbackArray: ClientMenu[] = new Array(limit).fill(null);
  const menus = data?.length > 0 ? data : fallbackArray;

  const [selectedId, setSelectedId] = useState<string>(null);

  return (
    <Base>
      <Col>
        <Grid>
          <AnimateSharedLayout type="crossfade">
            {menus.map((menu, index) => (
              <MenuCard
                key={index}
                menu={menu}
                onClick={() => setSelectedId(menu?.id)}
              />
            ))}
          </AnimateSharedLayout>
        </Grid>
      </Col>
    </Base>
  );
};
