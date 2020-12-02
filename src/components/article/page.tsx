import NotFound from "../../pages/404";
import ArticleBody from "./body";
import { DefaultLayout } from "../layout/Layout/Default";
import React from "react";
import { PostOrPage } from "@tryghost/content-api";
import { ArticleHero } from "./hero";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const ArticlePage: React.FunctionComponent<{
  post: PostOrPage;
  digibruh?: boolean;
  loading?: boolean;
}> = ({ post, digibruh = false, loading }) => {
  const router = useRouter();

  if (!post && !loading) {
    return <NotFound />;
  }

  const date = digibruh ? post?.updated_at : post?.published_at;
  const formattedDate = dayjs(date).locale(router.locale).format("D MMMM YYYY");
  const dateText = digibruh
    ? `Redigerad ${formattedDate}`
    : `Publicerad ${formattedDate}`;

  return (
    <DefaultLayout
      metadata={{
        title: post?.meta_title || post?.title,
        description: post?.meta_description || post?.excerpt,
        type: "article",
        images: [post?.feature_image],
      }}
    >
      <ArticleHero post={post} dateText={dateText} />
      <ArticleBody post={post} />
    </DefaultLayout>
  );
};

export default ArticlePage;
