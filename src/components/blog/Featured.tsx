import { WideCard } from "../basic/Card";
import Col from "react-bootstrap/Col";
import { Post, getLastFeatured } from "../../api/ghost/posts";
import useSWR from "swr";
import Row from "react-bootstrap/Row";
import { lineClamp, getPostUrl } from "./PostGrid";
import Skeleton from "react-loading-skeleton";
import React from "react";

class FeaturedPostItem extends React.Component<{
  post: Post | null;
  loading?: boolean;
  imageExpected?: boolean;
}> {
  render() {
    const { post, loading = false, imageExpected = true } = this.props;
    const excerptRows = 5;

    return (
      <WideCard
        badge={"Redaktörens val"}
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
        href={getPostUrl(post?.slug)}
        loading={loading}
        imageExpected={imageExpected}
      >
        <h3>{loading ? <Skeleton /> : post.title}</h3>
        <p className="mb-0 text-muted" style={lineClamp(excerptRows)}>
          {loading ? <Skeleton count={excerptRows} /> : post.excerpt}
        </p>
      </WideCard>
    );
  }
}

export const FeaturedPost: React.FunctionComponent = () => {
  const { data } = useSWR("/blog/featured", getLastFeatured);
  const loading = !data;

  return (
    <Row>
      <Col xs={12}>
        <FeaturedPostItem
          loading={loading}
          post={data || null}
          imageExpected={true}
        />
      </Col>
    </Row>
  );
};
