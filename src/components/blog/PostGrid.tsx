import React, { useState } from "react";
import { defaultParams } from "../../lib/api/ghost/post";
import { useSWRInfinite } from "swr";
import { GenericUser } from "../../lib/models/User";
import { PostOrPage, Params } from "@tryghost/content-api";
import api from "../../lib/api/ghost/credentials";
import { CardGrid, GridItem } from "../basic/CardGrid";
import { Row } from "../grid/Row";
import { Col } from "../grid/Col";
import VisibilitySensor from "react-visibility-sensor";

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
        href: getPostUrl(slug),
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
      items={items.length > 0 ? items : null}
      expectedNumberOfItems={expectedNumberOfPosts}
      imagesExpected={true}
      rowLimit={3}
      containerless={containerless}
    />
  );
};

export const PostGridAuto: React.FunctionComponent<{
  params?: Params;
  skip?: number;
}> = (props) => {
  const { params = {}, skip = 0 } = props;
  const limit = parseInt((params.limit || 10).toString());

  let [isReachingEnd, setIsReachingEnd] = useState(false);
  let [scrolledToBottom, setScrolledToBottom] = useState(false);

  const { data, size, setSize } = useSWRInfinite(
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

  if (scrolledToBottom && !isReachingEnd) {
    setSize(size + 1);
    setScrolledToBottom(false);
  }

  return (
    <>
      <PostGrid
        posts={(data || []).flat().slice(skip)}
        expectedNumberOfPosts={size * limit}
      />
      <VisibilitySensor onChange={setScrolledToBottom} partialVisibility>
        <Row>
          <Col>
            {isReachingEnd ? null : (
              <PostGrid posts={null} expectedNumberOfPosts={limit} />
            )}
          </Col>
        </Row>
      </VisibilitySensor>
    </>
  );
};
