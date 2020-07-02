import React from "react";
import { Layout } from "../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Section } from "../components/basic/Section";
import CountUp from "react-countup";

export default class Page extends React.Component {
  render() {
    return (
      <Layout title="Donationer">
        <Header />
        <Section hero>
          <Container>
            <Row>
              <Col xs={12} md={6} lg={4}>
                <h1 className="display-1 count-up mb-0">
                  <CountUp className="count-up" end={5} duration={5} /> personer
                </h1>
                <p className="lead">
                  har tillsammans donerat flera hundra kronor. Vi är enormt
                  tacksamma.
                </p>
              </Col>
            </Row>
          </Container>
        </Section>
      </Layout>
    );
  }
}
