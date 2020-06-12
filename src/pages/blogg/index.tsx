import React from "react";
import { Layout } from "../../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../../components/basic/Header";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { AutoLink } from "../../components/basic/AutoLink";
import { FeaturedPost } from "../../components/blog/Featured";
import { PostGrid } from "../../components/blog/PostGrid";

export default class Page extends React.Component {
  render() {
    return (
      <Layout>
        <Header fixedNav>
          <Col xs={12}>
            <div className="py-8">
              <h1 className="display-2 text-center mb-4">Vår blogg.</h1>
              <p className="lead text-center mb-4">Skriven mest av Bo.</p>
            </div>
          </Col>
        </Header>
        <section className="pt-7 pt-md-10">
          <Container>
            <FeaturedPost />
          </Container>
        </section>
        <section>
          <Container>
            <Row className="row align-items-center mb-5">
              <Col xs={12} className="col-md">
                <h3 className="mb-0">Senaste inläggen</h3>
                <p className="mb-0 text-muted">
                  Om skolmaten, våra digitala enheter och lite allt möjligt.
                </p>
              </Col>
              <Col xs={12} md="auto">
                <AutoLink
                  className="btn btn-outline-gray-300 d-none d-md-inline btn btn-outline-primary"
                  href="https://xn--sdermalmsskolan-8sb.com/blogg"
                >
                  Visa alla
                </AutoLink>
              </Col>
            </Row>
            <PostGrid posts={6} />
          </Container>
        </section>
      </Layout>
    );
  }
}
