import React from "react";
import { getPosts } from "../../api/ghost/post";
import useSWR from "swr";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NarrowCard } from "../basic/Card";
import Skeleton from "react-loading-skeleton";
import { GenericUser } from "../../models/User";
import { PostOrPage, PostsOrPages } from "@tryghost/content-api";

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
  loading?: boolean;
  imageExpected?: boolean;
}> {
  render() {
    const { post, loading = false, imageExpected = true } = this.props;
    const excerptRows = 3;
    const postUrl = getPostUrl(post?.slug);

    return (
      <NarrowCard
        meta={{
          authors: post?.authors.map(GenericUser.fromAuthor),
          date: new Date(post?.published_at),
        }}
        image={post?.feature_image}
        href={postUrl}
        loading={loading}
        imageExpected={imageExpected}
      >
        <h3>{loading ? <Skeleton /> : post.title}</h3>
        <p className="mb-0 text-muted" style={lineClamp(excerptRows)}>
          {loading ? <Skeleton count={excerptRows} /> : post?.excerpt}
        </p>
      </NarrowCard>
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
        return (
          <Col xs={12} md={6} lg={4} key={index} className="d-flex">
            <PostGridItem post={post} loading={!posts} />
          </Col>
        );
      })}
    </Row>
  );
};

export const PostGridAuto: React.FunctionComponent<{
  posts: number;
}> = (props) => {
  const { posts } = props;
  const { data } = useSWR(`blog/posts/latest?limit=${posts}`, () =>
    getPosts(posts)
  );

  return <PostGrid posts={data} expectedNumberOfPosts={posts} />;
};
