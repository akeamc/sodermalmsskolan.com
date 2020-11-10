import { getPostBySlug } from "../../lib/ghost/post";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../404";
import ArticlePage from "../../components/article/ArticlePage";
import Digibruh from "../../lib/digibruh/Digibruh";
import React from "react";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const slug = query.slug?.toString();
    const post = await getPostBySlug(slug);

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

    if (post?.tags?.map((tag) => tag.slug).includes(Digibruh.tagPrefix)) {
      throw new Error("Cannot view Digibruh article here.");
    }

    return {
      props: { post, errorCode: null },
    };
  } catch (error) {
    const statusCode = 404;
    res.statusCode = statusCode;
    return {
      props: {
        post: null,
        errorCode: statusCode,
      },
    };
  }
};

const Page: React.FunctionComponent = ({
  post,
  errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (errorCode) {
    return <NotFound />;
  }

  return <ArticlePage post={post} errorCode={errorCode} />;
};

export default Page;
