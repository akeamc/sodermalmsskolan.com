import Digibruh from "../../../../lib/digibruh/Digibruh";
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

  if (!found && !router.isFallback) {
    return <NotFound />;
  }

  const { data: digibruh } = Digibruh.use(initialDigibruh);

  const { data } = useSWR(
    `/digibruh/posts/${post?.slug}`,
    () => digibruh?.fetchPostBySlug(post?.slug),
    {
      initialData: post,
    }
  );

  return <ArticlePage digibruh post={data} />;
};

export default Page;
