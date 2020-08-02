import React, { useState } from "react";
import { defaultParams } from "../../lib/api/ghost/post";
import { useSWRInfinite } from "swr";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
  containerless?: boolean;
}> = (props) => {
  const { posts, expectedNumberOfPosts = 3, containerless = false } = props;
  const items: GridItem[] = (posts || []).map(
    ({ title, excerpt, slug, feature_image, published_at, authors }) => {
      return {
        title,
        description: excerpt,
        url: getPostUrl(slug),
        image: feature_image,
        meta: {
          date: new Date(published_at),
          authors: authors?.map(GenericUser.fromAuthor),
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
      containerless={containerless}
    />
  );
};

export const PostGridAuto: React.FunctionComponent<{
  params?: Params;
}> = (props) => {
  const { params = {} } = props;
  const limit = parseInt((params.limit || 10).toString());
  let [isReachingEnd, setIsReachingEnd] = useState(false);
  const { data, isValidating, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      let pagination = previousPageData?.meta?.pagination;

      if (pagination) {
        setIsReachingEnd(pagination.next == null);
        return pagination.next;
      }

      return 1;
    },
    async (page) => {
      const assembledParams = {
        ...defaultParams(),
        ...params,
        limit,
        page,
      };

      return await api.posts.browse(assembledParams);
    }
  );

  return (
    <>
      <PostGrid
        posts={(data || []).flat()}
        expectedNumberOfPosts={size * limit}
      />
      <Row className="justify-content-center">
        <Col xs="auto">
          {isReachingEnd ? (
            <small className="text-muted">Inga fler inlägg!</small>
          ) : (
            <button
              onClick={() => {
                setSize(size + 1);
              }}
              disabled={isValidating}
              className="btn btn-outline-gray-300 d-inline btn btn-outline-primary"
            >
              {isValidating ? "Hämtar fler inlägg" : "Hämta fler inlägg"}
            </button>
          )}
        </Col>
      </Row>
    </>
  );
};
