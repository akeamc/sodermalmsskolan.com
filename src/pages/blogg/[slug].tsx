import { getPostBySlug, getPosts } from "../../lib/ghost/post";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import NotFound from "../404";
import ArticlePage from "../../components/article/ArticlePage";
import React from "react";
import { useRouter } from "next/router";
import { postBelongsToBlog } from "../../lib/blog/filter";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts("all");

  const paths = posts.filter(postBelongsToBlog).map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params.slug?.toString();
    const post = await getPostBySlug(slug);

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

const Page: NextPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <ArticlePage loading post={null} />;
  }

  if (!post) {
    return <NotFound />;
  }

  return <ArticlePage post={post} />;
};

export default Page;
