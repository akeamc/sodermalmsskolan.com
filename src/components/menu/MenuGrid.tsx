import React from "react";
import moment from "moment";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Skeleton from "react-loading-skeleton";
import { useMenus } from "../../lib/api/main/menu/Menu";
import { Menu } from "../../lib/api/main/menu/Menu";

export class MenuGridItem extends React.Component<{
  menu: Menu | null;
  loading?: boolean;
}> {
  render() {
    const { menu, loading = false } = this.props;
    const fallbackValue = new Array(2).fill(<Skeleton count={2} />);

    if (menu || loading) {
      return (
        <>
          {loading ? (
            <Skeleton />
          ) : (
            <span className="badge badge-pill badge-primary-soft mb-2">
              <span className="h6 text-uppercase">
                {moment(menu.timestamp).locale("sv").format("dddd D MMMM")}
              </span>
            </span>
          )}

          {(menu?.dishes || fallbackValue).map((value, index) => (
            <p key={index} className="text-muted">
              {value}
            </p>
          ))}
        </>
      );
    } else {
      return <p className="text-muted">Menyn är inte tillgänglig.</p>;
    }
  }
}

export const MenuGrid: React.FunctionComponent<{
  numberOfMenus: number;
}> = ({ numberOfMenus }) => {
  const { data: menus } = useMenus({ limit: numberOfMenus });
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
