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
import { CardGrid, GridItem } from "../basic/CardGrid";

export function getPostUrl(slug: string | null): string {
  return `/blogg/${slug ? slug : ""}`;
}

export const PostGrid: React.FunctionComponent<{
  posts: PostOrPage[];
  expectedNumberOfPosts?: number;
  containerLess?: boolean;
}> = (props) => {
  const { posts, expectedNumberOfPosts = 3, containerLess = false } = props;
  const items: GridItem[] = (posts || []).map(
    ({ title, excerpt, slug, feature_image, published_at, authors }) => {
      return {
        title,
        description: excerpt,
        url: getPostUrl(slug),
        image: feature_image,
        meta: {
          date: new Date(published_at),
          authors: authors.map(GenericUser.fromAuthor),
        },
      };
    }
  );

  return (
    <CardGrid
      items={items}
      expectedNumberOfItems={expectedNumberOfPosts}
      imagesExpected={true}
      rowLimit={3}
      containerLess={containerLess}
    />
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

      let limit: number = parseInt(assembledParams.limit.toString()); // Convert ArrayOrValue<number> to number

      return (
        <PostGrid
          posts={data}
          expectedNumberOfPosts={limit}
          containerLess={true}
        ></PostGrid>
      );
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
              className="btn btn-outline-gray-300 d-inline btn btn-outline-primary"
            >
              {isLoadingMore ? "Hämtar fler inlägg" : "Hämta fler inlägg"}
            </button>
          )}
        </Col>
      </Row>
    </>
  );
};
