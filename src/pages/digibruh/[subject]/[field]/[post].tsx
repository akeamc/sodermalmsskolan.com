import Digibruh from "../../../../lib/digibruh/Digibruh";
import NotFound from "../../../404";
import ArticlePage from "../../../../components/article/ArticlePage";
import useSWR from "swr";
import {
  DigibruhPage,
  getInitialDigibruh,
} from "../../../../lib/digibruh/utils/initialprops";
import React from "react";

const Page: DigibruhPage = (props) => {
  if (props.errorCode) {
    return <NotFound />;
  }

  const { data: digibruh } = Digibruh.use(new Digibruh(props.initialDigibruh));
  const { data: post } = useSWR(
    `/digibruh/posts/${props.post?.slug}`,
    () => digibruh.fetchPostBySlug(props.post?.slug),
    {
      initialData: props.post,
    }
  );

  return <ArticlePage digibruh post={post} errorCode={props.errorCode} />;
};

Page.getInitialProps = getInitialDigibruh;

export default Page;
