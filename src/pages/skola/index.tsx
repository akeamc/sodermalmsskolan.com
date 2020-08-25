import React from "react";
import { Layout } from "../../components/basic/Layout";
import { Navigation } from "../../components/basic/Navigation";
import { HeroWithTitle } from "../../components/layout/Hero/Title";
import withAuth from "../../hocs/withAuth";
import { useAuth } from "../../providers/Auth";
import { Section } from "../../components/layout/Section";
import { Row } from "../../components/grid/Row";
import { Col } from "../../components/grid/Col";

const Page: React.FunctionComponent = () => {
  const { user } = useAuth();

  return (
    <Layout
      metadata={{
        title: "Skola",
      }}
    >
      <Navigation />
      <HeroWithTitle title="Skola" />
      <Section>
        <Row>
          <Col>
            <ul>
              {user?.roles.map((role, index) => (
                <li key={index} style={{ color: role.hexColor }}>
                  {role.name}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Section>
    </Layout>
  );
};

export default withAuth(Page);
