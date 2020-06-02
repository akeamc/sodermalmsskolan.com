import React from "react";
import { Layout } from "../components/basic/Layout";
import { Header } from "../components/basic/Header";
import Button from "react-bootstrap/Button";
import * as Icon from "react-feather";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navigation } from "../components/basic/Navigation";
import { AutoLink } from "../components/basic/AutoLink";

export default class Page extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <Col sm={12} md={5} lg={6} className="order-md-2">
            <img
              src="https://cdn.discordapp.com/attachments/705522103985635394/717096876016664596/SHREK_BETA1.png"
              className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0"
            />
          </Col>
          <Col sm={12} md={7} lg={6} className="order-md-1">
            <h1 className="display-3 text-center text-md-left mb-4">
              Sodexo, DigiLär och{" "}
              <span className="text-primary">Botrikames Amkingbrink</span>.
            </h1>
            <p className="lead text-muted text-center text-md-left mb-6 mb-lg-8">
              Vi visar vad Quality of Life Services egentligen betyder.
            </p>
            <div className="text-center text-md-left">
              <AutoLink href="/meny">
                <Button variant="primary" className="mr-2">
                  Visa menyn{" "}
                  <Icon.ArrowRight
                    className="d-none d-md-inline ml-2"
                    size={20}
                  />
                </Button>
              </AutoLink>
              <AutoLink href="https://xn--sdermalmsskolan-8sb.com/blogg">
                <Button variant={null} className="btn-primary-soft">
                  Blogg
                </Button>
              </AutoLink>
            </div>
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
