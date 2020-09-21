import NotFound from "../../../pages/404";
import ArticleBody from "./ArticleBody";
import { Layout } from "../../layout/Layout";
import React from "react";
import { PostOrPage } from "@tryghost/content-api";
import { ArticleHero } from "./Hero";
import moment from "moment";

export default class ArticlePage extends React.Component<{
  post: PostOrPage;
  digibruh?: boolean;
  errorCode: number | null;
}> {
  render() {
    const { post, errorCode, digibruh = false } = this.props;
    if (errorCode) {
      return <NotFound />;
    }

    const date = digibruh ? post?.updated_at : post?.published_at;
    const formattedDate = moment(date).locale("sv").format("D MMMM YYYY");
    const dateText = digibruh
      ? `Redigerad ${formattedDate}`
      : `Publicerad ${formattedDate}`;

    return (
      <Layout
        metadata={{
          title: post?.meta_title || post?.title,
          description: post?.meta_description || post?.excerpt,
          type: "article",
          images: [post?.feature_image],
        }}
      >
        <ArticleHero post={post} dateText={dateText} />
        <ArticleBody data={post} />
      </Layout>
    );
  }
}
