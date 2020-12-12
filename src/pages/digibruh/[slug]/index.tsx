import {
  GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage,
} from "next";
import React from "react";
import ArticlePage from "../../../components/digibruh/ArticlePage";
import { browseDigibruhArticles, postIsDigibruhArticle } from "../../../lib/digibruh/hooks/article";
import { readPost } from "../../../lib/ghost/post";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await browseDigibruhArticles();

  const paths = posts.filter(postIsDigibruhArticle).map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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

const Page: NextPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <ArticlePage post={post} />
);

export default Page;
