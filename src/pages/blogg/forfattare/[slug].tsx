import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../404";
import { Layout } from "../../../components/basic/Layout";
import { getAuthorBySlug } from "../../../lib/api/ghost/author";
import { PostGridAuto } from "../../../components/blog/PostGrid";
import { Avatar } from "../../../components/basic/Avatar";
import { PostOrPage } from "@tryghost/content-api";
import Digibruh from "../../../lib/digibruh/Digibruh";
import useSWR from "swr";
import { CardGrid } from "../../../components/basic/CardGrid";
import { Field } from "../../../lib/digibruh/Field";
import React from "react";
import { Section } from "../../../components/layout/Section";
import { Row } from "../../../components/grid/Row";
import { Col } from "../../../components/grid/Col";
import { GridTitleSection } from "../../../components/basic/Typography";
import { SplitHeader } from "../../../components/layout/Header";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const slug = query.slug?.toString();
    const author = await getAuthorBySlug(slug);

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

    return {
      props: { author, errorCode: null },
    };
  } catch (error) {
    const statusCode = 404;
    res.statusCode = statusCode;
    return {
      props: {
        author: null,
        errorCode: statusCode,
      },
    };
  }
};

const HeaderAvatar = styled(Avatar)`
  margin-bottom: 24px;
`;

const Page: React.FunctionComponent = ({
  author,
  errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (errorCode) {
    return <NotFound />;
  }

  const digibruhSWR = useSWR(`blog/author/${author.slug}/digibruh`, () =>
    Digibruh.fetchPostsByAuthor(author.slug)
  );

  const digibruhPosts: PostOrPage[] = digibruhSWR.data || [];

  return (
    <Layout title={author?.name}>
      <SplitHeader
        title={author?.name}
        lead={author?.bio}
        image={author?.cover_image}
      />
      <Section>
        <Row>
          <Col xs={12}>
            <GridTitleSection title="Blogginlägg" />
          </Col>
        </Row>
        <PostGridAuto
          params={{
            filter: `author:${author?.slug}+tag:-${Digibruh.tagPrefix}`,
          }}
        />
      </Section>
      <Section>
        <Row>
          <Col xs={12}>
            <GridTitleSection title="Digibruh-artiklar" />
          </Col>
        </Row>
        <CardGrid
          items={digibruhPosts.map(Field.postToGridItem)}
          imagesExpected={true}
          rowLimit={3}
        />
      </Section>
    </Layout>
  );
};

export default Page;
