import React from "react";
import { Layout } from "../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import Container from "react-bootstrap/Container";
import { StudySetGrid } from "../components/quizlet/StudySetGrid";

export default class Page extends React.Component {
  render() {
    return (
      <Layout title="Quizlet">
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
            <StudySetGrid />
          </Container>
        </section>
      </Layout>
    );
  }
}
