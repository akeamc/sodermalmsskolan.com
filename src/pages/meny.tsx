import React from "react";
import { Layout } from "../components/basic/Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import Container from "react-bootstrap/Container";

export default class Page extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <Col sm={12} md={5} lg={6} className="order-md-2">
            <img
              src="https://cdn.discordapp.com/attachments/575993879837409290/666282862151991296/IMG_3695.JPG"
              className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0 rounded-lg"
            />
          </Col>
          <Col sm={12} md={7} lg={6} className="order-md-1">
            <h1 className="display-3 text-center text-md-left mb-4">
              Vi visar upp <span className="text-primary">Sodexo</span> för
              världen.
            </h1>
            <p className="lead text-muted text-center text-md-left mb-6 mb-lg-8">
              Bilder varje dag.
            </p>
          </Col>
        </Header>
        <section className="py-8 py-md-11">
          <Container>
            <Row>
              <Col sm={12} md={4}>
                <h3>Dagens lunch</h3>
                <p className="text-muted">
                  Rödbetsbiffar servera med kokt potatis, fetaostcreme
                </p>
                <p className="text-muted">
                  Pastasallad med blandade bönor och salladsost
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    );
  }
}
