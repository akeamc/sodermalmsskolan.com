import React from "react";
import { Layout } from "../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import { AutoLink } from "../components/basic/AutoLink";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default class Page extends React.Component {
  render() {
    return (
      <Layout>
        <Header />
        <section className="py-8 py-md-11">
          <Container>
            <Row>
              <Col xs={12} md={6} lg={4}>
                <h1>Donationer.</h1>
                <p className="text-muted">
                  Trots att vi har annonser på vår hemsida, ger några hundra
                  visningar per månad inte mycket i annonspengar. Vi är därför
                  beroende av donationer för att hålla hemsidan uppe, och vi är
                  obeskrivligt tacksamma för nedanstående donationer.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    );
  }
}
