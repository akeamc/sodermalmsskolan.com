import { DefaultLayout } from "../../../components/layout/Layout/Default";
import NotFound from "../../404";
import Digibruh, {
  DigibruhSubjectPath,
  useDigibruh,
} from "../../../lib/digibruh/Digibruh";
import { DigibruhPage, getStaticDigibruh } from "../../../lib/digibruh/ssg";
import React from "react";
import { Base } from "../../../components/grid/Base";
import { Section } from "../../../components/layout/Section";
import { Col } from "../../../components/grid/Col";
import { GridTitleSection } from "../../../components/basic/Typography";
import { DigibruhHero } from "../../../components/digibruh/Hero";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import CardGrid from "../../../components/card/grid";
import { FieldCard } from "../../../components/digibruh/field";

export const getStaticPaths: GetStaticPaths = async () => {
  const digibruh = await Digibruh.initialize();

  const { subjects } = digibruh;

  return {
    paths: subjects.map((subject) => {
      const params: DigibruhSubjectPath = {
        subject: subject.slug,
      };

      return { params };
    }),
    fallback: true,
  };
};

export const getStaticProps = getStaticDigibruh;

const Page: DigibruhPage = ({
  found,
  subject: subjectSlug,
  initialDigibruh,
}) => {
  const router = useRouter();

  const digibruh = useDigibruh(initialDigibruh);

  if (!found && !router.isFallback) {
    return <NotFound />;
  }

  const subject = digibruh?.getSubjectBySlug(subjectSlug);

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
          cards={subject?.fields?.map((field, index) => (
            <FieldCard key={index} field={field} />
          ))}
        />
      </Section>
    </DefaultLayout>
  );
};

export default Page;
