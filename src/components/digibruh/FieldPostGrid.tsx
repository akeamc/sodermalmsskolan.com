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
  loading?: boolean;
  imageExpected?: boolean;
}> {
  render() {
    const { post, loading = false, imageExpected = true } = this.props;
    const excerptRows = 3;
    const subject = post
      ? Subject.fromTag(
          post?.tags?.find((tag) => Subject.regex().test(tag.slug))
        )
      : null;

    return (
      <NarrowCard
        meta={{
          authors: post?.authors.map(GenericUser.fromAuthor),
          date: new Date(post?.created_at),
        }}
        image={post?.feature_image}
        href={subject?.getPostUrl(post) || "#"}
        loading={loading}
        imageExpected={imageExpected}
      >
        <h3>{loading ? <Skeleton /> : post?.title}</h3>
        <p className="mb-0 text-muted" style={lineClamp(excerptRows)}>
          {loading ? <Skeleton count={excerptRows} /> : post?.excerpt}
        </p>
      </NarrowCard>
    );
  }
}

const FieldPostGrid: React.FunctionComponent<{
  field: Field;
}> = (props) => {
  const { field } = props;
  let { data } = useSWR(`digibruh/fields/${field.tagSlug}`, field.getPosts);
  const placeholder: PostOrPage[] = new Array(3).fill(null);

  return (
    <Row>
      {(data || placeholder).map((post, index) => {
        return (
          <Col xs={12} md={6} lg={4} key={index} className="d-flex">
            <FieldPostGridItem post={post} loading={!data} />
          </Col>
        );
      })}
    </Row>
  );
};

export default FieldPostGrid;
