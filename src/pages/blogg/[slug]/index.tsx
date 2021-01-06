import {
  GetStaticPaths, GetStaticProps, NextPage,
} from "next";
import { useRouter } from "next/router";
import React from "react";
import PostPage, { PostPageProps } from "../../../components/post/PostPage";
import postBelongsToBlog from "../../../lib/blog/postBelongsToBlog";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Post, { browsePosts, readPost } from "../../../lib/ghost/post";
import NotFoundPage from "../../404";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await browsePosts();

  const paths = posts.filter(postBelongsToBlog).map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
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
 * @param {Post} props.post The post.
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
