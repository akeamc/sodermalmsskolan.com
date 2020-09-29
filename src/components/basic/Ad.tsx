import React from "react";
import AdSense from "react-adsense";
import { Section } from "../layout/Section";
import { Base } from "../grid/Row";
import { Col } from "../grid/Col";

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
      <Base>
        <Col>
          <ResponsiveAd />
        </Col>
      </Base>
    </Section>
  );
};
