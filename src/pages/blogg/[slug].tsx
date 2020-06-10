import { useRouter } from "next/router";
import { Layout } from "../../components/basic/Layout";
import { Header } from "../../components/basic/Header";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ArticleBody from "../../components/blog/article/ArticleBody";
import { getPostBySlug } from "../../api/ghost/posts";
import Skeleton from "react-loading-skeleton";
import Row from "react-bootstrap/Row";
import MetaSection from "../../components/blog/article/MetaSection";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../404";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const slug = query.slug?.toString();
    const post = await getPostBySlug(slug);
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate"
    );
    return {
      props: { post, errorCode: null },
    };
  } catch (error) {
    const statusCode = 404;
    res.statusCode = statusCode;
    return {
      props: {
        post: null,
        errorCode: statusCode,
      },
    };
  }
};

const Page: React.FunctionComponent = ({
  post,
  errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (errorCode) {
    return <NotFound />;
  }

  return (
    <Layout>
      <Header
        fixedNav
        backgroundImage={post?.feature_image}
        style={{ minHeight: "50vh" }}
      />
      <section className="pt-8 pt-md-11">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={9} xl={8}>
              <h1 className="display-4 text-center">{post.title}</h1>

              <p className="lead mb-7 text-center text-muted">
                {post.custom_excerpt}
              </p>
              <MetaSection
                publishedAt={post?.published_at}
                authors={post?.authors}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <ArticleBody data={post} />
      <section className="pt-6 pt-md-8 pb-8 pb-md-11">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={9} xl={8}>
              <MetaSection
                publishedAt={post?.published_at}
                authors={post?.authors}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Page;
