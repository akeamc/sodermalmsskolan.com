import { DefaultLayout } from "../../../components/layout/Layout/Default";
import NotFound from "../../404";
import { CardGrid } from "../../../components/basic/CardGrid";
import Digibruh from "../../../lib/digibruh/Digibruh";
import { DigibruhPage, getInitialDigibruh } from "../../../lib/digibruh/ssr";
import React from "react";
import { Base } from "../../../components/grid/Base";
import { Section } from "../../../components/layout/Section";
import { Col } from "../../../components/grid/Col";
import { GridTitleSection } from "../../../components/basic/Typography";
import { DigibruhHero } from "../../../components/digibruh/Hero";

const Page: DigibruhPage = (props) => {
  if (props.errorCode) {
    return <NotFound />;
  }

  const { data: digibruh } = Digibruh.use(new Digibruh(props.initialDigibruh));
  const subject = digibruh.getSubjectBySlug(props.subject);

  return (
    <DefaultLayout
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
        <Base>
          <Col xs={12}>
            <GridTitleSection title="Områden" />
          </Col>
        </Base>
        <CardGrid
          items={(subject?.fields || []).map((field) => field.toGridItem())}
          imagesExpected={true}
          expectedNumberOfItems={3}
        />
      </Section>
    </DefaultLayout>
  );
};

Page.getInitialProps = getInitialDigibruh;

export default Page;
