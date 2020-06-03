import React from "react";
import { Layout } from "../components/basic/Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { NarrowCard } from "../components/basic/Card";

export default class Page extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <Col xs={12}>
            <div className="py-8">
              <h1 className="display-1 text-center mb-4">Quizlet.</h1>
              <p className="lead text-center mb-4">
                Quizlets till allt möjligt.
              </p>
            </div>
          </Col>
        </Header>
        <section className="py-8 py-md-11">
          <Container>
            <Row>
              <Col xs={12} md={6} lg={4} className="d-flex">
                <NarrowCard
                  meta={{
                    authors: [
                      {
                        name: "ThePicoNerd",
                        avatarUrl:
                          "https://quizlet.com/cdn-cgi/image/f=auto,fit=cover,h=116,onerror=redirect,w=116/https://up.quizlet.com/upb7k-hYQwN-768.jpg",
                      },
                    ],
                    date: new Date(),
                  }}
                  href="https://quizlet.com/491657594/tyskaprov-10-11-mars-2020-flash-cards/"
                >
                  <h3>Tyskaprov 10-11 mars 2020</h3>
                  <p className="mb-0 text-muted">228 termer</p>
                </NarrowCard>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    );
  }
}
