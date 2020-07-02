import React from "react";
import { Layout } from "../components/basic/Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import Container from "react-bootstrap/Container";
import { AutoLink } from "../components/basic/AutoLink";
import { MenuGrid } from "../components/menu/MenuGrid";
import { FoodPhotos } from "../components/menu/FoodPhotos";
import { AdSection } from "../components/basic/Ad";
import { Section } from "../components/basic/Section";

export default class Page extends React.Component {
  render() {
    return (
      <Layout title="Meny">
        <Header>
          <Col xs={12} md={5} className="order-md-2">
            <img
              src="https://cdn.discordapp.com/attachments/575993879837409290/666282862151991296/IMG_3695.JPG"
              className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0 rounded-lg"
            />
          </Col>
          <Col xs={12} md={7} className="order-md-1">
            <h1 className="display-3 text-center text-md-left mb-4">
              Vi visar upp <span className="text-primary">Sodexo</span> för
              världen.
            </h1>
            <p className="lead text-muted text-center text-md-left mb-6 mb-lg-8">
              I över ett år har vi fotat maten som Sodexo serverar och spridit
              bilderna på nätet. Vi kommer aldrig ge upp.
            </p>
          </Col>
        </Header>
        <AdSection />
        <Section>
          <Container>
            <MenuGrid numberOfMenus={6} />
            <Row>
              <Col xs={12}>
                <small className="text-muted">
                  Visa hela menyn på{" "}
                  <AutoLink href="https://skolmaten.se/sodermalmsskolan-gamla-maria/">
                    skolmaten.se
                  </AutoLink>
                  .
                </small>
              </Col>
            </Row>
          </Container>
        </Section>
        <AdSection />
        <Section>
          <Container>
            <FoodPhotos />
          </Container>
        </Section>
      </Layout>
    );
  }
}
