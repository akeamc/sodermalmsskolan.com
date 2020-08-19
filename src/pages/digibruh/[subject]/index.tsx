import { Layout } from "../../../components/basic/Layout";
import NotFound from "../../404";
import { CardGrid } from "../../../components/basic/CardGrid";
import Digibruh, { useDigibruh } from "../../../lib/digibruh/Digibruh";
import {
  DigibruhPage,
  getInitialDigibruh,
} from "../../../lib/digibruh/utils/initialprops";
import React from "react";
import { Row } from "../../../components/grid/Row";
import { Section } from "../../../components/layout/Section";
import { Col } from "../../../components/grid/Col";
import { GridTitleSection } from "../../../components/basic/Typography";
import { DigibruhHero } from "../../../components/digibruh/Hero";

const Page: DigibruhPage = (props) => {
  if (props.errorCode) {
    return <NotFound />;
  }

  const { data: digibruh } = useDigibruh(new Digibruh(props.initialDigibruh));
  const subject = digibruh.getSubjectBySlug(props.subject);

  return (
    <Layout
      metadata={{
        title: subject?.name,
        description: subject?.description,
        images: [subject?.coverImage],
      }}
    >
      <DigibruhHero
        title={subject?.name}
        lead={subject?.description}
        image={subject?.coverImage}
      />
      <Section>
        <Row>
          <Col xs={12}>
            <GridTitleSection title="Områden" />
          </Col>
        </Row>
        <CardGrid
          items={(subject?.fields || []).map((field) => field.toGridItem())}
          imagesExpected={true}
          expectedNumberOfItems={3}
        />
      </Section>
    </Layout>
  );
};

Page.getInitialProps = getInitialDigibruh;

export default Page;
