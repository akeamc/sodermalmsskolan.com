import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import PostPage, { PostPageProps } from "../../../components/post/PostPage";
import { browseDigibruhArticles, postIsDigibruhArticle } from "../../../lib/digibruh/hooks/article";
import { GhostStaticPathParams } from "../../../lib/ghost/common";
import { readPost } from "../../../lib/ghost/post";
import NotFoundPage from "../../404";

export const getStaticPaths: GetStaticPaths<GhostStaticPathParams> = async () => {
  const posts = await browseDigibruhArticles();

  const paths = posts.filter(postIsDigibruhArticle).map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<
PostPageProps,
GhostStaticPathParams
> = async ({ params }) => {
  try {
    const slug = params.slug?.toString();
    const post = await readPost({ slug });

    if (!postIsDigibruhArticle(post)) {
      throw new Error("Post isn't bruh.");
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
 *
 * @param props
 * @param props.post
 */
const DigibruhPostPage: NextPage<PostPageProps> = ({
  post,
}) => {
  const router = useRouter();

  if (!post && !router.isFallback) {
    return <NotFoundPage />;
  }

  return <PostPage post={post} digibruh />;
};

export default DigibruhPostPage;
