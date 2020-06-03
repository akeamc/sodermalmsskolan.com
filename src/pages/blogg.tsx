import React from "react";
import { Layout } from "../components/basic/Layout";
import Col from "react-bootstrap/Col";
import { Header } from "../components/basic/Header";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { WideCard, NarrowCard } from "../components/basic/Card";

import { getPosts, getLastFeatured, Post } from "../api/ghost/posts";
import { AutoLink } from "../components/basic/AutoLink";

function lineClamp(lines: number): React.CSSProperties {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

export default class Page extends React.Component<{
  posts: Post[];
  featured: Post;
}> {
  static async getInitialProps() {
    const posts = await getPosts(7);
    const featured = await getLastFeatured();
    //console.log(featured);
    return { posts: posts, featured: featured };
  }

  render() {
    const { featured } = this.props;
    const posts = this.props.posts.filter((post) => post.id != featured.id);

    return (
      <Layout>
        <Header fixedNav>
          <Col xs={12}>
            <div className="py-8">
              <h1 className="display-2 text-center mb-4">Vår blogg.</h1>
              <p className="lead text-center mb-4">Skriven mest av Bo.</p>
            </div>
          </Col>
        </Header>
        <section className="pt-7 pt-md-10">
          <Container>
            <Row>
              <Col xs={12}>
                <WideCard
                  badge={"Redaktörens val"}
                  meta={{
                    authors: featured.authors.map((author) => {
                      return {
                        name: author.name,
                        avatarUrl: author.profile_image,
                        url: author.url,
                      };
                    }),
                    date: featured.created_at,
                  }}
                  image={featured.feature_image}
                  href={featured.url}
                >
                  <h3>{featured.title}</h3>
                  <p className="mb-0 text-muted" style={lineClamp(5)}>
                    {featured.excerpt}
                  </p>
                </WideCard>
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <Row className="row align-items-center mb-5">
              <Col xs={12} className="col-md">
                <h3 className="mb-0">Senaste inläggen</h3>
                <p className="mb-0 text-muted">
                  Om skolmaten, våra digitala enheter och lite allt möjligt.
                </p>
              </Col>
              <Col xs={12} md="auto">
                <AutoLink
                  className="btn btn-outline-gray-300 d-none d-md-inline btn btn-outline-primary"
                  href="https://xn--sdermalmsskolan-8sb.com/blogg"
                >
                  Visa alla
                </AutoLink>
              </Col>
            </Row>

            <Row>
              {posts.map((post) => {
                return (
                  <Col xs={12} md={6} lg={4} className="d-flex">
                    <NarrowCard
                      meta={{
                        authors: post.authors.map((author) => {
                          return {
                            name: author.name,
                            avatarUrl: author.profile_image,
                            url: author.url,
                          };
                        }),
                        date: post.created_at,
                      }}
                      image={post.feature_image}
                      href={post.url}
                    >
                      <h3>{post.title}</h3>
                      <p className="mb-0 text-muted" style={lineClamp(3)}>
                        {post.excerpt}
                      </p>
                    </NarrowCard>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
      </Layout>
    );
  }
}
