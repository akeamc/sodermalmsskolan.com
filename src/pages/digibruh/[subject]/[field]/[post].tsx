import Digibruh, { useDigibruh } from "../../../../lib/digibruh/Digibruh";
import NotFound from "../../../404";
import ArticlePage from "../../../../components/article/page";
import useSWR from "swr";
import React from "react";
import { GetStaticPaths } from "next";
import { DigibruhPage, getStaticDigibruh } from "../../../../lib/digibruh/ssg";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await Digibruh.fetchAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: Digibruh.getPostPath(post),
      };
    }),
    fallback: true,
  };
};

export const getStaticProps = getStaticDigibruh;

const Page: DigibruhPage = ({ found, initialDigibruh, post }) => {
  const router = useRouter();

  const digibruh = useDigibruh(initialDigibruh);

  const { data } = useSWR(
    `/digibruh/posts/${post?.slug}`,
    () => digibruh?.fetchPostBySlug(post?.slug),
    {
      initialData: post,
    }
  );

  if (!found && !router.isFallback) {
    return <NotFound />;
  }

  return <ArticlePage digibruh post={data} />;
};

export default Page;
