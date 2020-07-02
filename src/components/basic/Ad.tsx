import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import AdSense from "react-adsense";
import { Section } from "./Section";

export const ResponsiveAd: React.FunctionComponent = () => {
  return (
    <AdSense.Google
      client={process.env.adsenseClient}
      slot={process.env.adsenseSlot}
      style={{ display: "block" }}
      layout="in-article"
      format="fluid"
    />
  );
};

export const AdSection: React.FunctionComponent = () => {
  return (
    <Section>
      <Container>
        <Row>
          <Col>
            <ResponsiveAd />
          </Col>
        </Row>
      </Container>
    </Section>
  );
};
