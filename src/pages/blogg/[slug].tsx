import { useRouter } from "next/router";
import { Layout } from "../../components/basic/Layout";
import { Header } from "../../components/basic/Header";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ArticleBody from "../../components/blog/article/ArticleBody";
import useSWR from "swr";
import { getPostBySlug } from "../../api/ghost/posts";
import Skeleton from "react-loading-skeleton";
import Row from "react-bootstrap/Row";
import MetaSection from "../../components/blog/article/MetaSection";

const Page: React.FunctionComponent = () => {
  const router = useRouter();
  const slug = (router.query.slug || "").toString();
  const { data } = useSWR(`blog/posts/${slug}`, () => getPostBySlug(slug));
  const loading = !data;

  return (
    <Layout>
      <Header
        fixedNav
        backgroundImage={data?.feature_image}
        style={{ minHeight: "50vh" }}
      />
      <section className="pt-8 pt-md-11">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={9} xl={8}>
              <h1 className="display-4 text-center">
                {loading ? <Skeleton /> : data.title}
              </h1>

              <p className="lead mb-7 text-center text-muted">
                {loading ? <Skeleton count={3} /> : data.custom_excerpt}
              </p>
              <MetaSection
                loading={loading}
                publishedAt={data?.published_at}
                author={data?.primary_author}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <ArticleBody loading={loading} data={data || null} />
      <section className="pt-6 pt-md-8 pb-8 pb-md-11">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={9} xl={8}>
              <MetaSection
                loading={loading}
                publishedAt={data?.published_at}
                author={data?.primary_author}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default Page;
