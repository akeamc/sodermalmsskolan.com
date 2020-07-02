import React from "react";
import { Layout } from "../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Section } from "../components/basic/Section";
import { NumberDisplay } from "../components/basic/NumberDisplay";

export default class Page extends React.Component {
  render() {
    return (
      <Layout title="Investerare">
        <Header />
        <Section hero>
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <h1>Våra investerare</h1>
                <p className="lead">
                  Flera framgångsrika investerare från Södermalmsskolan har
                  investerat i södermalmsskolan.com.
                </p>
              </Col>
            </Row>
          </Container>
        </Section>
        <Section>
          <Container>
            <NumberDisplay
              numbers={[
                {
                  description: "Kapital",
                  decimal: ",",
                  decimals: 2,
                  end: 81.9,
                  duration: 5,
                  suffix: " SEK",
                },
                {
                  description: "Värdering",
                  decimal: ",",
                  decimals: 2,
                  end: 11.88,
                  duration: 5,
                  suffix: " SEK",
                },
                {
                  description: "Investerare",
                  end: 5,
                  duration: 5,
                },
              ]}
            />
          </Container>
        </Section>
      </Layout>
    );
  }
}
