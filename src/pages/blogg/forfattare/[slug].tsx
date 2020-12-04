import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../404";
import { DefaultLayout } from "../../../components/layout/Layout/Default";
import { getAuthorBySlug } from "../../../lib/ghost/author";
import { PostGridAuto } from "../../../components/blog/PostGrid";
import Digibruh from "../../../lib/digibruh/Digibruh";
import useSWR from "swr";
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
import CardGrid from "../../../components/card/grid";
import PostCard from "../../../components/article/postcard";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const slug = query.slug?.toString();
    const author = await getAuthorBySlug(slug);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

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
  const { data: digibruhPosts } = useSWR(
    `blog/author/${author.slug}/digibruh`,
    () => Digibruh.fetchPostsByAuthor(author.slug)
  );

  if (errorCode) {
    return <NotFound />;
  }

  return (
    <DefaultLayout metadata={{ title: author?.name, description: author?.bio }}>
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
          cards={digibruhPosts?.map((post, index) => (
            <PostCard key={index} post={post} digibruh />
          ))}
        />
      </Section>
    </DefaultLayout>
  );
};

export default Page;
