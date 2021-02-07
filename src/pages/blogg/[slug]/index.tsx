import {
  GetStaticPaths, GetStaticProps, NextPage,
} from "next";
import { useRouter } from "next/router";
import React from "react";
import PostPage, { PostPageProps } from "../../../components/post/PostPage";
import postBelongsToBlog from "../../../lib/blog/postBelongsToBlog";
import { GhostStaticPathParams } from "../../../lib/ghost/common";
import { browsePosts, readPost } from "../../../lib/ghost/post";
import NotFoundPage from "../../404";

/**
 * Pre-generate paths to the blog posts.
 *
 * @returns {Promise<import("next").GetStaticPathsResult<GhostStaticPathParams>>} The static paths.
 */
export const getStaticPaths: GetStaticPaths<GhostStaticPathParams> = async () => {
  const posts = await browsePosts();

  const paths = posts.filter(postBelongsToBlog).map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
};

/**
 * `getStaticProps` for the blog posts.
 *
 * @param {import("next").GetStaticPropsContext<GhostStaticPathParams>} context The context.
 *
 * @returns {Promise<import("next").GetStaticPropsResult<PostPageProps>>} The props for each page.
 */
export const getStaticProps: GetStaticProps<
PostPageProps,
GhostStaticPathParams
> = async ({ params }) => {
  try {
    const slug = params.slug?.toString();
    const post = await readPost({ slug });

    if (!postBelongsToBlog(post)) {
      throw new Error("Post doesn't belong to the blog.");
    }

    return {
      props: { post },
      revalidate: 30,
    };
  } catch (error) {
    return {
      props: {
        post: null,
      },
      revalidate: 1,
    };
  }
};

/**
 * @param {PostPageProps} props Props.
 *
 * @returns {React.ReactElement} The blog post page.
 */
const BlogPostPage: NextPage<PostPageProps> = ({
  post,
}) => {
  const router = useRouter();

  if (!post && !router.isFallback) {
    return <NotFoundPage />;
  }

  return <PostPage post={post} />;
};

export default BlogPostPage;
