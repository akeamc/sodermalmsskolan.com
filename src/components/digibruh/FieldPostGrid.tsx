import { Field, Subject } from "../../models/Digibruh";
import useSWR from "swr";
import { lineClamp } from "../blog/PostGrid";
import { NarrowCard } from "../basic/Card";
import Skeleton from "react-loading-skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import { GenericUser } from "../../models/User";
import { PostOrPage } from "@tryghost/content-api";

class FieldPostGridItem extends React.Component<{
  post: PostOrPage | null;
  imageExpected?: boolean;
}> {
  render() {
    const { post, imageExpected = true } = this.props;
    const excerptRows = 3;
    const subject = post?.tags
      ? Subject.fromTag(
          post?.tags?.find((tag) => Subject.regex().test(tag.slug))
        )
      : null;

    return (
      <NarrowCard
        meta={{
          authors: post?.authors.map(GenericUser.fromAuthor),
          date: new Date(post?.updated_at),
        }}
        image={post?.feature_image}
        href={subject?.getPostUrl(post) || "#"}
        loading={!post}
        imageExpected={imageExpected}
      >
        <h3>{post ? post?.title : <Skeleton />}</h3>
        <p className="mb-0 text-muted" style={lineClamp(excerptRows)}>
          {post ? post?.excerpt : <Skeleton count={excerptRows} />}
        </p>
      </NarrowCard>
    );
  }
}

export const FieldPostGrid: React.FunctionComponent<{
  posts: PostOrPage[];
}> = (props) => {
  const { posts } = props;

  return (
    <Row>
      {(posts || []).map((post, index) => {
        return (
          <Col xs={12} md={6} lg={4} key={index} className="d-flex">
            <FieldPostGridItem post={post} />
          </Col>
        );
      })}
    </Row>
  );
};

export const FieldPostGridAuto: React.FunctionComponent<{
  field: Field;
}> = (props) => {
  const { field } = props;
  let { data } = useSWR(`digibruh/fields/${field.tagSlug}`, () =>
    field.getPosts()
  );
  const placeholder: PostOrPage[] = new Array(3).fill(null);

  return <FieldPostGrid posts={data || placeholder} />;
};
