import styled from "styled-components";
import React from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { useMenus } from "../../lib/api/main/menu/Menu";
import { Menu } from "../../lib/api/main/menu/Menu";
import { Row } from "../grid/Row";
import { Col } from "../grid/Col";
import { firstLetterUpperCase } from "../../lib/utils/letters";

const GridTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const GridItem = styled.div`
  li:last-child {
    margin-bottom: 0;
  }
`;

export class MenuGridItem extends React.Component<{
  menu: Menu | null;
  loading?: boolean;
}> {
  render() {
    const { menu, loading = false } = this.props;
    const fallbackValue = new Array(2).fill(<Skeleton count={2} />);

    if (menu || loading) {
      return (
        <GridItem>
          <GridTitle>
            {loading ? (
              <Skeleton />
            ) : (
              firstLetterUpperCase(
                moment(menu?.timestamp).locale("sv").format("dddd D MMMM")
              )
            )}
          </GridTitle>

          <ul>
            {(menu?.dishes || fallbackValue).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </GridItem>
      );
    } else {
      return <p>Menyn är inte tillgänglig.</p>;
    }
  }
}

export const MenuGrid: React.FunctionComponent<{
  numberOfMenus: number;
}> = ({ numberOfMenus }) => {
  const { data: menus } = useMenus({ limit: numberOfMenus, offset: -100 });
  const fallbackArray: Menu[] = new Array(numberOfMenus).fill(null);

  return (
    <Row>
      {((menus?.length > 0 ? menus : [null]) || fallbackArray).map(
        (menu: Menu, index) => (
          <Col xs={12} md={4} key={index}>
            <MenuGridItem loading={!menus} menu={menu} />
          </Col>
        )
      )}
    </Row>
  );
};
