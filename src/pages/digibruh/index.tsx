import React from "react";
import { Layout } from "../../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../../components/basic/Header";
import Container from "react-bootstrap/Container";
import SubjectsOverview from "../../components/digibruh/SubjectsOverview";

const Page: React.FunctionComponent = () => {
  return (
    <Layout title="Digibruh">
      <Header fixedNav>
        <Col xs={12}>
          <div className="py-8">
            <h1 className="display-2 text-center mb-4">Digibruh.</h1>
            <p className="lead text-center mb-4">
              Ett digitalt läromedel av elever, för elever.
            </p>
          </div>
        </Col>
      </Header>
      <Container>
        <SubjectsOverview />
      </Container>
    </Layout>
  );
};

export default Page;
