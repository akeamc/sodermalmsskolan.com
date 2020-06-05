import React from "react";
import { getPosts, Post } from "../../api/ghost/posts";
import useSWR from "swr";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NarrowCard } from "../basic/Card";
import Skeleton from "react-loading-skeleton";

export function lineClamp(lines: number): React.CSSProperties {
  return {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
  };
}

class PostGridItem extends React.Component<{
  post: Post | null;
  loading?: boolean;
  imageExpected?: boolean;
}> {
  render() {
    const { post, loading = false, imageExpected = true } = this.props;
    const excerptRows = 3;

    return (
      <NarrowCard
        meta={{
          authors: post?.authors?.map((author) => {
            return {
              name: author.name,
              avatarUrl: author.profile_image,
              url: author.url,
            };
          }),
          date: post?.created_at,
        }}
        image={post?.feature_image}
        href={post?.url}
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
  posts: number;
}> = (props) => {
  const { posts } = props;
  const { data, error } = useSWR(`blog/posts/latest?limit=${posts}`, () =>
    getPosts(posts)
  );
  const placeholder: null[] = new Array(posts).fill(null);

  return (
    <Row>
      {(data || placeholder).map((post, index) => {
        return (
          <Col xs={12} md={6} lg={4} key={index} className="d-flex">
            <PostGridItem post={post} loading={!data} />
          </Col>
        );
      })}
    </Row>
  );
};
