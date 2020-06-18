import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../404";
import { Layout } from "../../../components/basic/Layout";
import { Header } from "../../../components/basic/Header";
import Col from "react-bootstrap/Col";
import { getAuthorBySlug, getAuthorUrl } from "../../../lib/api/ghost/author";
import { PostGridAuto } from "../../../components/blog/PostGrid";
import useSWR from "swr";
import { getPosts } from "../../../lib/api/ghost/post";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Avatar } from "../../../components/basic/Avatar";
import { PostOrPage } from "@tryghost/content-api";
import { digibruhTag } from "../../../lib/models/Digibruh";
import { FieldPostGrid } from "../../../components/digibruh/FieldPostGrid";

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

  const { data: digibruhArticles } = useSWR(
    `blog/author/${author.slug}/posts`,
    () => {
      return getPosts("all", `authors.slug:${author.slug}+tag:${digibruhTag}`);
    }
  );

  const placeholder: PostOrPage[] = new Array(6).fill(null);

  return (
    <Layout title={author?.name}>
      <Header
        fixedNav
        backgroundImage={author?.cover_image}
        style={author?.cover_image ? { minHeight: "50vh" } : null}
      />
      <section className="py-8 py-md-11">
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
      </section>
      <section>
        <Container>
          <Row className="row align-items-center mb-5">
            <Col xs={12} className="col-md">
              <h3 className="mb-0">Blogginlägg</h3>
            </Col>
          </Row>
          <PostGridAuto
            params={{
              filter: `author:${author?.slug}+tag:-${digibruhTag}`,
            }}
          />
        </Container>
      </section>
      <section className="py-8 py-md-11">
        <Container>
          <Row className="row align-items-center mb-5">
            <Col xs={12} className="col-md">
              <h3 className="mb-0">Digibruh-artiklar</h3>
            </Col>
          </Row>
          <FieldPostGrid posts={digibruhArticles || placeholder} />
        </Container>
      </section>
    </Layout>
  );
};

export default Page;
