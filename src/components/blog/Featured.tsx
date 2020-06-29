import { WideCard } from "../basic/Card";
import Col from "react-bootstrap/Col";
import { getLastFeatured } from "../../lib/api/ghost/post";
import useSWR from "swr";
import Row from "react-bootstrap/Row";
import { getPostUrl } from "./PostGrid";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { GenericUser } from "../../lib/models/User";
import { PostOrPage } from "@tryghost/content-api";
import { getLineClamp } from "../basic/CardGrid";

class FeaturedPostItem extends React.Component<{
  post: PostOrPage | null;
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
          authors: post?.authors.map(GenericUser.fromAuthor),
          date: new Date(post?.published_at),
        }}
        image={post?.feature_image}
        href={getPostUrl(post?.slug)}
        loading={loading}
        imageExpected={imageExpected}
      >
        <h3>{loading ? <Skeleton /> : post.title}</h3>
        <p className="mb-0 text-muted" style={getLineClamp(excerptRows)}>
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
