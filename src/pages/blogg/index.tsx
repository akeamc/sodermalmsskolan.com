import React from "react";
import { Layout } from "../../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../../components/basic/Header";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { FeaturedPost } from "../../components/blog/Featured";
import { PostGridAuto } from "../../components/blog/PostGrid";
import { AdSection } from "../../components/basic/Ad";
import { Section } from "../../components/basic/Section";

export default class Page extends React.Component {
  render() {
    return (
      <Layout title="Blogg">
        <Header fixedNav>
          <Col xs={12}>
            <div className="py-8">
              <h1 className="display-2 text-center mb-4">Vår blogg.</h1>
              <p className="lead text-center mb-4">Skriven mest av Bo.</p>
            </div>
          </Col>
        </Header>
        <Section>
          <Container>
            <FeaturedPost />
          </Container>
        </Section>
        <AdSection />
        <Section>
          <Container>
            <Row className="row align-items-center mb-5">
              <Col xs={12} className="col-md">
                <h3 className="mb-0">Senaste inläggen</h3>
                <p className="mb-0 text-muted">
                  Om skolmaten, våra digitala enheter och lite allt möjligt.
                </p>
              </Col>
            </Row>
            <PostGridAuto />
          </Container>
        </Section>
      </Layout>
    );
  }
}
