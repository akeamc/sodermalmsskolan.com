import React from "react";
import { Schedules } from "../../lib/schedule/Schedule";
import { ScheduleViewer } from "../../components/schedule/Schedule";
import { Layout } from "../../components/basic/Layout";
import { Navigation } from "../../components/basic/Navigation";
import { Section } from "../../components/layout/Section";
import { Row } from "../../components/grid/Row";
import { Col } from "../../components/grid/Col";
import { HeroWithTitle } from "../../components/layout/Hero/Title";

const Page: React.FunctionComponent = () => {
  return (
    <Layout metadata={{ title: "Schema" }}>
      <Navigation />
      <HeroWithTitle title="Schema" />
      {Schedules.map((schedule, index) => {
        return (
          <Section key={index}>
            <Row>
              <Col>
                <ScheduleViewer schedule={schedule} />
              </Col>
            </Row>
          </Section>
        );
      })}
    </Layout>
  );
};

export default Page;
