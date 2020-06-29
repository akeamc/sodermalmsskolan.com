import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Digibruh, { useDigibruh } from "../../../../lib/digibruh/Digibruh";
import NotFound from "../../../404";
import ArticlePage from "../../../../components/blog/article/ArticlePage";
import useSWR from "swr";
import { PostOrPage } from "@tryghost/content-api";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const digibruh = await Digibruh.initialize();
    const subjectSlug = query.subject?.toString();
    const fieldSlug = query.field?.toString();

    const post = await digibruh.fetchPostBySlug(query.post?.toString());

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

    if (digibruh.getFieldBySlug(subjectSlug, fieldSlug) && post) {
      return {
        props: {
          subject: subjectSlug,
          field: fieldSlug,
          post,
          errorCode: null,
        },
      };
    } else {
      throw new Error("Post not found!");
    }
  } catch (error) {
    const statusCode = 404;
    res.statusCode = statusCode;
    return {
      props: {
        subject: null,
        field: null,
        post: null,
        errorCode: statusCode,
      },
    };
  }
};

const Page: React.FunctionComponent = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const post: PostOrPage = props.post;

  return <ArticlePage digibruh post={post} errorCode={props.errorCode} />;
};

export default Page;
