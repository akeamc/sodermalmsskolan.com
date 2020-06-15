import React from "react";
import { Layout } from "../../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../../components/basic/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SubjectsGrid from "../../components/digibruh/SubjectsGrid";

export default class Page extends React.Component {
  render() {
    return (
      <Layout title="Digibruh">
        <Header fixedNav>
          <Col xs={12}>
            <div className="py-8">
              <h1 className="display-2 text-center mb-4">Digibruh.</h1>
              <p className="lead text-center mb-4">
                Ett digitalt läromedel av elever, för elever.
              </p>
            </div>
          </Col>
        </Header>
        <section className="pt-7 pt-md-10">
          <Container>
            <Row className="row align-items-center mb-5">
              <Col xs={12} className="col-md">
                <h3 className="mb-0">Ämnen</h3>
                {/* <p className="mb-0 text-muted">Hej hej digi bruh</p> */}
              </Col>
            </Row>
            <SubjectsGrid />
          </Container>
        </section>
      </Layout>
    );
  }
}
