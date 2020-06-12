import { getPostBySlug } from "../../../api/ghost/posts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NotFound from "../../404";
import { digibruhTag } from "../../../models/Digibruh";
import ArticlePage from "../../../components/blog/article/ArticlePage";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  try {
    const slug = query.slug?.toString();
    const post = await getPostBySlug(slug);
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    if (!post.tags.map((tag) => tag.slug).includes(digibruhTag)) {
      throw new Error("Cannot view non-Digibruh article here.");
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
