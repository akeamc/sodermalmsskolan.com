import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../404";
import { Layout } from "../../../components/layout/Layout";
import { getAuthorBySlug } from "../../../lib/ghost/author";
import { PostGridAuto } from "../../../components/blog/PostGrid";
import { PostOrPage } from "@tryghost/content-api";
import Digibruh from "../../../lib/digibruh/Digibruh";
import useSWR from "swr";
import { CardGrid } from "../../../components/basic/CardGrid";
import { Field } from "../../../lib/digibruh/Field";
import React from "react";
import { Section } from "../../../components/layout/Section";
import { Base } from "../../../components/grid/Base";
import { Col } from "../../../components/grid/Col";
import {
  GridTitleSection,
  LeadText,
} from "../../../components/basic/Typography";
import { HeaderWithBackground } from "../../../components/layout/Header";
import { HeroTitle } from "../../../components/layout/Hero";

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
    <Layout metadata={{ title: author?.name, description: author?.bio }}>
      <HeaderWithBackground image={author?.cover_image}>
        <HeroTitle>{author?.name}</HeroTitle>
        <LeadText>{author?.bio}</LeadText>
      </HeaderWithBackground>
      <Section>
        <Base>
          <Col xs={12}>
            <GridTitleSection title="Blogginlägg" />
          </Col>
        </Base>
        <PostGridAuto
          params={{
            filter: `author:${author?.slug}+tag:-${Digibruh.tagPrefix}`,
          }}
        />
      </Section>
      <Section>
        <Base>
          <Col xs={12}>
            <GridTitleSection title="Digibruh-artiklar" />
          </Col>
        </Base>
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
