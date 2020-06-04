import React from "react";
import { FoodMenu } from "../../api/menu/menu";
import moment from "moment";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class MenuGridItem extends React.Component<{
  menu: FoodMenu | null;
}> {
  render() {
    const { menu } = this.props;

    if (menu) {
      return (
        <>
          <span className="badge badge-pill badge-primary-soft mb-2">
            <span className="h6 text-uppercase">
              {moment(menu.timestamp).locale("sv").format("dddd D MMMM")}
            </span>
          </span>
          {menu.dishes.map((dish, index) => (
            <p key={index} className="text-muted">
              {dish}
            </p>
          ))}
        </>
      );
    } else {
      return <p className="text-muted">Menyn är inte tillgänglig.</p>;
    }
  }
}

export class MenuGrid extends React.Component<{
  menus: FoodMenu[];
}> {
  render() {
    return (
      <Row>
        {this.props.menus.map((menu) => (
          <Col xs={12} md={4}>
            <MenuGridItem menu={menu} />
          </Col>
        ))}
      </Row>
    );
  }
}
