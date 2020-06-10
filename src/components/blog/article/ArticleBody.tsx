import Skeleton from "react-loading-skeleton";
import { Post } from "../../../api/ghost/posts";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ReactHtmlParser from "react-html-parser";

function transform(node, index) {
  if (node.type === "tag" && node.name === "div") {
    return null;
  }
}

const ArticleBody: React.FunctionComponent<{
  data: Post | null;
  loading?: boolean;
}> = (props) => {
  const { data, loading } = props;

  return (
    <section className="pt-6 pt-md-8">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9} xl={8}>
            <div className="article-body">
              {loading ? (
                <>
                  <h1>{<Skeleton />}</h1>
                  <p>{<Skeleton count={5} />}</p>
                </>
              ) : (
                <div>
                  {ReactHtmlParser(data.html, {
                    transform,
                  })}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ArticleBody;
