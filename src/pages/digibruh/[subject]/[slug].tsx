import { getPostBySlug } from "../../../api/ghost/post";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../404";
import { digibruhTag, Subject } from "../../../models/Digibruh";
import ArticlePage from "../../../components/blog/article/ArticlePage";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const subject = await Subject.get(query.subject?.toString());

    const post = await subject.getPost(query.slug?.toString());

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

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

  return <ArticlePage digibruh post={post} errorCode={errorCode} />;
};

export default Page;
