import Skeleton from "react-loading-skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { PostOrPage } from "@tryghost/content-api";

const ArticleBody: React.FunctionComponent<{
  data: PostOrPage | null;
  loading?: boolean;
}> = (props) => {
  const { data, loading } = props;

  return (
    <section className="pt-6 pt-md-8">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9} xl={8}>
            {loading ? (
              <div className="article-body">
                <h1>{<Skeleton />}</h1>
                <p>{<Skeleton count={5} />}</p>
              </div>
            ) : (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: data.html }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ArticleBody;
