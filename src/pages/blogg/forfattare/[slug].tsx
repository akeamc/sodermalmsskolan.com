import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../404";
import { Layout } from "../../../components/basic/Layout";
import { Header } from "../../../components/basic/Header";
import Col from "react-bootstrap/Col";
import { getAuthorBySlug, getAuthorUrl } from "../../../lib/api/ghost/author";
import { PostGridAuto } from "../../../components/blog/PostGrid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Avatar } from "../../../components/basic/Avatar";
import { PostOrPage } from "@tryghost/content-api";
import Digibruh from "../../../lib/digibruh/Digibruh";
import useSWR from "swr";
import { CardGrid } from "../../../components/basic/CardGrid";
import { Field } from "../../../lib/digibruh/Field";
import React from "react";
import { Section } from "../../../components/basic/Section";

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
    <Layout title={author?.name}>
      <Header
        fixedNav
        backgroundImage={author?.cover_image}
        style={author?.cover_image ? { minHeight: "50vh" } : null}
      />
      <Section>
        <Container>
          <Row className="justify-content-center">
            <Col
              xs={12}
              md={10}
              lg={9}
              xl={8}
              className="order-md-1 text-center"
            >
              {author?.profile_image ? (
                <Avatar
                  href={getAuthorUrl(author.slug)}
                  imageUrl={author?.profile_image}
                  size="5xl"
                  className="mb-4 d-inline-block lift"
                />
              ) : (
                <></>
              )}
              <h1>{author.name}</h1>
              <p className="text-muted">{author?.bio}</p>
            </Col>
          </Row>
        </Container>
      </Section>
      <Section>
        <Container>
          <Row className="row align-items-center mb-5">
            <Col xs={12} className="col-md">
              <h3 className="mb-0">Blogginlägg</h3>
            </Col>
          </Row>
          <PostGridAuto
            params={{
              filter: `author:${author?.slug}+tag:-${Digibruh.tagPrefix}`,
            }}
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <Row className="row align-items-center mb-5">
            <Col xs={12} className="col-md">
              <h3 className="mb-0">Digibruh-artiklar</h3>
            </Col>
          </Row>
          <CardGrid
            items={digibruhPosts.map(Field.postToGridItem)}
            imagesExpected={true}
            rowLimit={3}
          />
        </Container>
      </Section>
    </Layout>
  );
};

export default Page;
