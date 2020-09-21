import { Layout } from "../../../../components/layout/Layout";
import NotFound from "../../../404";
import { CardGrid, GridItem } from "../../../../components/basic/CardGrid";
import Digibruh, { useDigibruh } from "../../../../lib/digibruh/Digibruh";
import useSWR from "swr";
import { PostOrPage } from "@tryghost/content-api";
import {
  DigibruhPage,
  getInitialDigibruh,
} from "../../../../lib/digibruh/utils/initialprops";
import { GenericUser } from "../../../../lib/models/User";
import React from "react";
import { Row } from "../../../../components/grid/Row";
import { Col } from "../../../../components/grid/Col";
import { Section } from "../../../../components/layout/Section";
import { GridTitleSection } from "../../../../components/basic/Typography";
import { DigibruhHero } from "../../../../components/digibruh/Hero";

const Page: DigibruhPage = (props) => {
  if (props.errorCode) {
    return <NotFound />;
  }

  const { data: digibruh } = useDigibruh(new Digibruh(props.initialDigibruh));
  const field = digibruh.getFieldBySlug(props.subject, props.field);
  const postSWR = useSWR(field?.url, () => {
    return field?.posts();
  });

  const posts: PostOrPage[] = postSWR.data || [];
  const loadingPosts = !postSWR.data;

  const items: GridItem[] = posts.map(
    ({
      title,
      excerpt,
      slug,
      feature_image,
      updated_at,
      published_at,
      authors,
    }) => {
      return {
        title,
        description: excerpt,
        href: field.postUrl(slug),
        image: feature_image,
        meta: {
          date: new Date(updated_at || published_at),
          authors: authors.map(GenericUser.fromAuthor),
        },
      };
    }
  );

  return (
    <Layout
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
        <Row>
          <Col xs={12}>
            <GridTitleSection title="Artiklar" />
          </Col>
        </Row>
        <CardGrid
          items={loadingPosts ? null : items}
          imagesExpected={true}
          expectedNumberOfItems={3}
          rowLimit={5}
        />
      </Section>
    </Layout>
  );
};

Page.getInitialProps = getInitialDigibruh;

export default Page;
