import React, { useEffect, useState } from "react";
import { defaultParams } from "../../lib/ghost/post";
import { useSWRInfinite } from "swr";
import { PostOrPage, Params } from "@tryghost/content-api";
import api from "../../lib/ghost/credentials";
import { useInView } from "react-intersection-observer";
import CardGrid from "../card/grid";
import PostCard from "../article/postcard";

export function getPostUrl(slug: string | null): string {
  return `/blogg/${slug ? slug : ""}`;
}

export const PostGrid: React.FunctionComponent<{
  posts: PostOrPage[];
  expectedNumberOfPosts?: number;
  containerless?: boolean;
}> = (props) => {
  const { posts, expectedNumberOfPosts = 3, containerless = false } = props;

  return (
    <CardGrid
      cards={posts?.map(
        (post, index) => (
          <PostCard key={index} post={post} />
        )
        // return {
        //   title,
        //   description: excerpt,
        //   href: getPostUrl(slug),
        //   image: feature_image,
        //   meta: {
        //     date: new Date(published_at),
        //     authors: authors?.map(GenericUser.fromAuthor),
        //   },
        // };
      )}
    />
  );
};

export const PostGridAuto: React.FunctionComponent<{
  params?: Params;
  skip?: number;
}> = (props) => {
  const { params = {}, skip = 0 } = props;
  const limit = parseInt(params.limit?.toString()) || 10;

  const [isReachingEnd, setIsReachingEnd] = useState(false);
  const { ref, inView } = useInView();

  const { data, size, setSize } = useSWRInfinite(
    (_, previousPageData) => {
      const pagination = previousPageData?.meta?.pagination;

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

  useEffect(() => {
    if (inView && !isReachingEnd) {
      setSize(size + 1);
    }
  }, [inView, isReachingEnd, setSize, size]);

  return (
    <>
      <PostGrid
        posts={(data || []).flat().slice(skip)}
        expectedNumberOfPosts={size * limit}
      />
      <div ref={ref}>
        <PostGrid
          posts={null}
          expectedNumberOfPosts={isReachingEnd ? 0 : limit}
        />
      </div>
    </>
  );
};
