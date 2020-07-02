import NotFound from "../../../pages/404";
import ArticleBody from "./ArticleBody";
import { Header } from "../../basic/Header";
import { Layout } from "../../basic/Layout";
import React from "react";
import Container from "react-bootstrap/Container";
import MetaSection from "./MetaSection";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PostOrPage } from "@tryghost/content-api";
import { Section } from "../../basic/Section";

export default class ArticlePage extends React.Component<{
  post: PostOrPage;
  digibruh?: boolean;
  errorCode: number | null;
}> {
  render() {
    const { post, errorCode, digibruh = false } = this.props;
    if (errorCode) {
      return <NotFound />;
    }

    const meta = (
      <MetaSection
        date={new Date(digibruh ? post?.updated_at : post?.published_at)}
        dateDescription={digibruh ? "Redigerad" : null}
        authors={post?.authors}
      />
    );

    return (
      <Layout title={post?.title}>
        <Header
          fixedNav
          backgroundImage={post?.feature_image}
          style={post?.feature_image ? { minHeight: "50vh" } : null}
        />
        <Section>
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={10} xl={8}>
                <h1 className="display-4 text-center">{post.title}</h1>

                <p className="lead mb-7 text-center text-muted">
                  {post.custom_excerpt}
                </p>
                {meta}
              </Col>
            </Row>
          </Container>
        </Section>
        <ArticleBody data={post} scrollSpy={digibruh} />
        <Section>
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={9} xl={8}>
                {meta}
              </Col>
            </Row>
          </Container>
        </Section>
      </Layout>
    );
  }
}
