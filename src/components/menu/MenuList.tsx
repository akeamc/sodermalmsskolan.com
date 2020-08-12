import styled from "styled-components";
import React from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { useMenus } from "../../lib/api/main/menu/Menu";
import { Menu } from "../../lib/api/main/menu/Menu";
import { Row } from "../grid/Row";
import { Col } from "../grid/Col";
import { firstLetterUpperCase } from "../../lib/utils/letters";

const ItemTitle = styled.h6`
  margin-bottom: 1rem;
`;

const MenuListItem: React.FunctionComponent<{ menu: Menu }> = ({ menu }) => {
  const date = menu?.timestamp ? (
    firstLetterUpperCase(
      moment(menu?.timestamp).locale("sv").format("dddd D MMMM")
    )
  ) : (
    <Skeleton />
  );

  return (
    <div>
      <ItemTitle>{date}</ItemTitle>
      <ul>
        {menu?.dishes.map((dish) => (
          <li>{dish}</li>
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
  const { data, isValidating } = useMenus({ limit: 90 });
  const fallbackArray: Menu[] = new Array(numberOfMenus).fill(null);
  const menus = data?.length > 0 ? data : fallbackArray;

  return (
    <Row>
      <Col xs={12} md={9} lg={8}>
        <Grid>
          {menus.map((menu) => (
            <MenuListItem menu={menu} />
          ))}
        </Grid>
      </Col>
    </Row>
  );
};
