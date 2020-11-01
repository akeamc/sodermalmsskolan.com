import React from "react";
import AdSense from "react-adsense";
import { Section } from "../layout/Section";
import { Base } from "../grid/Base";
import { Col } from "../grid/Col";
import { client, slot } from "../../lib/google/adsense";

export const ResponsiveAd: React.FunctionComponent = () => {
  return (
    <AdSense.Google
      client={client}
      slot={slot}
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
