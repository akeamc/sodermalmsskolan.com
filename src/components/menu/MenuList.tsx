import styled from "styled-components";
import React from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { useMenus } from "../../lib/api/main/food/Menu";
import { Menu } from "../../lib/api/main/food/Menu";
import { Row } from "../grid/Row";
import { Col } from "../grid/Col";
import { firstLetterUpperCase } from "../../lib/utils/letters";

const ItemTitle = styled.h6`
  margin-bottom: 1rem;
`;

const MenuListItem: React.FunctionComponent<{ menu: Menu }> = ({ menu }) => {
  const date = menu?.date ? (
    firstLetterUpperCase(moment(menu?.date).locale("sv").format("dddd D MMMM"))
  ) : (
    <Skeleton />
  );

  const dishes =
    menu?.dishes?.map((dish) => dish.title) || new Array(2).fill(<Skeleton />);

  return (
    <div>
      <ItemTitle>{date}</ItemTitle>
      <ul>
        {dishes.map((dish, index) => (
          <li key={index}>{dish}</li>
        ))}
      </ul>
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--grid-gap);
`;

export const MenuList: React.FunctionComponent<{
  numberOfMenus: number;
}> = ({ numberOfMenus }) => {
  const { data, isValidating } = useMenus({ limit: numberOfMenus });
  const fallbackArray: Menu[] = new Array(numberOfMenus).fill(null);
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
