import styled from "styled-components";
import React from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { Row } from "../grid/Row";
import { Col } from "../grid/Col";
import { firstLetterUpperCase } from "../../lib/utils/letters";
import * as breakpoints from "../../styles/breakpoints";
import { Menu } from "../../lib/food/structures/shared/Menu";
import { ClientMenu } from "../../lib/food/structures/client/Menu";
import { Dish } from "../../lib/food/structures/shared/Dish";
import { ClientDish } from "../../lib/food/structures/client/Dish";
import { useLocale } from "../../hooks/locale";

const ItemTitle = styled.h6`
  margin-bottom: 1rem;
`;

const DishEmissions: React.FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = ClientDish.use(id);
  const { locale } = useLocale();

  return (
    <span>
      ({data?.co2e.toLocaleString(locale) || <Skeleton width={32} />} kg CO₂e
      per kg)
    </span>
  );
};

const DishItem: React.FunctionComponent<{ dish: Dish }> = ({ dish }) => {
  return (
    <li>
      {dish.title} <DishEmissions id={dish?.id} />
    </li>
  );
};

const MenuListItem: React.FunctionComponent<{ menu: Menu }> = ({ menu }) => {
  const { locale } = useLocale();
  const date = menu?.date ? (
    firstLetterUpperCase(
      moment(menu?.date).locale(locale).format("dddd D MMMM")
    )
  ) : (
    <Skeleton />
  );

  return (
    <div>
      <ItemTitle>{date}</ItemTitle>
      <ul>
        {menu?.dishes?.map((dish, index) => (
          <DishItem key={index} dish={dish} />
        ))}
      </ul>
    </div>
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
  const { data, isValidating } = ClientMenu.use({ limit });
  const fallbackArray: Menu[] = new Array(limit).fill(null);
  const menus = data?.length > 0 ? data : fallbackArray;
  const isEmpty = !isValidating && !data;

  return (
    <Row>
      <Col xs={12} md={9} lg={8}>
        <Grid>
          {isEmpty ? (
            <p>Menyn är inte tillgänglig.</p>
          ) : (
            menus.map((menu, index) => <MenuListItem key={index} menu={menu} />)
          )}
        </Grid>
      </Col>
    </Row>
  );
};
