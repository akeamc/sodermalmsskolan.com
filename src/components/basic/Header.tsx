import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export class Header extends React.Component<{
  children: JSX.Element | JSX.Element[];
}> {
  render() {
    let { children } = this.props;

    return (
      <section className="pt-4 pt-md-11">
        <Container>
          <Row className="align-items-center">{children}</Row>
        </Container>
      </section>
    );
  }
}
