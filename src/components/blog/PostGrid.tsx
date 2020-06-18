import React from "react";
import { defaultParams } from "../../lib/api/ghost/post";
import useSWR, { useSWRPages } from "swr";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NarrowCard } from "../basic/Card";
import Skeleton from "react-loading-skeleton";
import { GenericUser } from "../../lib/models/User";
import { PostOrPage, Params } from "@tryghost/content-api";
import api from "../../lib/api/ghost/credentials";

export function getPostUrl(slug: string | null): string {
  return `/blogg/${slug ? slug : ""}`;
}

export function lineClamp(lines: number): React.CSSProperties {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

class PostGridItem extends React.Component<{
  post: PostOrPage | null;
  imageExpected?: boolean;
}> {
  render() {
    const { post, imageExpected = true } = this.props;
    const excerptRows = 3;
    const postUrl = getPostUrl(post?.slug);
    const loading = !post;

    return (
      <Col xs={12} md={6} lg={4} className="d-flex">
        <NarrowCard
          meta={{
            authors: (post?.authors || []).map(GenericUser.fromAuthor),
            date: new Date(post?.published_at),
          }}
          image={post?.feature_image}
          href={postUrl}
          loading={loading}
          imageExpected={imageExpected}
        >
          <h3>{loading ? <Skeleton /> : post?.title}</h3>
          <p className="mb-0 text-muted" style={lineClamp(excerptRows)}>
            {loading ? <Skeleton count={excerptRows} /> : post?.excerpt}
          </p>
        </NarrowCard>
      </Col>
    );
  }
}

export const PostGrid: React.FunctionComponent<{
  posts: PostOrPage[];
  expectedNumberOfPosts?: number;
}> = (props) => {
  const { posts, expectedNumberOfPosts = 3 } = props;
  const placeholder: PostOrPage[] = new Array(expectedNumberOfPosts).fill(null);

  return (
    <Row>
      {(posts || placeholder).map((post, index) => {
        return <PostGridItem post={post} key={index} />;
      })}
    </Row>
  );
};

export const PostGridAuto: React.FunctionComponent<{
  params?: Params;
}> = (props) => {
  const { params = {} } = props;
  const { pages, isLoadingMore, loadMore, isReachingEnd } = useSWRPages(
    `blog/posts`,
    ({ offset, withSWR }) => {
      const assembledParams = {
        ...defaultParams(),
        ...params,
        page: offset || 1,
      };

      const { data } = withSWR(
        useSWR(`blog/posts?page=${offset}`, () =>
          api.posts.browse(assembledParams)
        )
      );

      const placeholder = new Array(assembledParams.limit).fill(null);

      return (data || placeholder).map((post, index) => (
        <PostGridItem key={index} post={post} />
      ));
    },
    (SWR) => {
      return SWR.data.meta.pagination.next;
    },
    []
  );

  return (
    <>
      <Row>{pages}</Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          {isReachingEnd ? (
            <small className="text-muted">Inga fler inlägg!</small>
          ) : (
            <button
              onClick={loadMore}
              disabled={isLoadingMore}
              className="btn btn-outline-gray-300 d-none d-md-inline btn btn-outline-primary"
            >
              {isLoadingMore ? "Hämtar fler inlägg" : "Hämta fler inlägg"}
            </button>
          )}
        </Col>
      </Row>
    </>
  );
};
