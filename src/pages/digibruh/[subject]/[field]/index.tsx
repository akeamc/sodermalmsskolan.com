import { DefaultLayout } from "../../../../components/layout/Layout/Default";
import NotFound from "../../../404";
import Digibruh, {
  DigibruhFieldPath,
  useDigibruh,
} from "../../../../lib/digibruh/Digibruh";
import useSWR from "swr";
import { DigibruhPage, getStaticDigibruh } from "../../../../lib/digibruh/ssg";
import React from "react";
import { Base } from "../../../../components/grid/Base";
import { Col } from "../../../../components/grid/Col";
import { Section } from "../../../../components/layout/Section";
import {
  GridTitleSection,
  LineClamped,
} from "../../../../components/basic/Typography";
import { DigibruhHero } from "../../../../components/digibruh/Hero";
import { StudySetGrid } from "../../../../components/quizlet/Grid";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import CardGrid from "../../../../components/card/grid";
import Card from "../../../../components/card";
import PostCard from "../../../../components/article/postcard";

export const getStaticPaths: GetStaticPaths = async () => {
  const digibruh = await Digibruh.initialize();

  const { subjects } = digibruh;

  return {
    paths: subjects.flatMap((subject) => {
      return subject.fields.map((field) => {
        const params: DigibruhFieldPath = {
          field: field.slug,
          subject: subject.slug,
        };

        return {
          params,
        };
      });
    }),
    fallback: true,
  };
};

export const getStaticProps = getStaticDigibruh;

const Page: DigibruhPage = ({
  found,
  subject: subjectSlug,
  field: fieldSlug,
  initialDigibruh,
}) => {
  const router = useRouter();

  const digibruh = useDigibruh(initialDigibruh);

  const field = digibruh?.getFieldBySlug(subjectSlug, fieldSlug);

  const { data: posts } = useSWR(field?.url, () => {
    return field?.posts();
  });

  if (!found && !router.isFallback) {
    return <NotFound />;
  }

  return (
    <DefaultLayout
      metadata={{
        title: field?.name,
        description: field?.description,
        images: [field?.coverImage],
      }}
    >
      <DigibruhHero
        title={field?.name}
        lead={field?.description}
        image={field?.coverImage}
      />
      <Section>
        <Base>
          <Col>
            <GridTitleSection title="Artiklar" />
          </Col>
        </Base>
        <CardGrid
          cards={posts?.map((post, index) => (
            <PostCard key={index} post={post} digibruh />
          ))}
        />
      </Section>
      <Section>
        <Base>
          <Col>
            <GridTitleSection title="Quizlet" />
          </Col>
        </Base>
        <StudySetGrid field={fieldSlug} />
      </Section>
    </DefaultLayout>
  );
};

export default Page;
