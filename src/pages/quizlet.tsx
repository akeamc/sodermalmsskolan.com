import React from "react";
import { Layout } from "../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import Container from "react-bootstrap/Container";
import { StudySetGrid } from "../components/quizlet/StudySetGrid";
import { getStudySets, StudySet } from "../api/quizlet/studysets";

export default class Page extends React.Component<{
  studySets: StudySet[];
}> {
  static async getInitialProps() {
    const studySets = await getStudySets();

    return {
      studySets,
    };
  }

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
            <StudySetGrid sets={this.props.studySets} />
          </Container>
        </section>
      </Layout>
    );
  }
}
