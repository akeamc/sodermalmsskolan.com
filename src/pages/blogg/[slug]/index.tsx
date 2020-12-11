import {
  GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage,
} from "next";
import { useRouter } from "next/router";
import React from "react";
import { postBelongsToBlog } from "../../../lib/blog/filter";
import { browsePosts, readPost } from "../../../lib/ghost/post";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await browsePosts();

  const paths = posts.filter(postBelongsToBlog).map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params.slug?.toString();
    const post = await readPost({ slug });

    if (!postBelongsToBlog(post)) {
      throw new Error("Post doesn't belong to the blog.");
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
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>läser in ...</p>;
  }

  if (!post) {
    return <h1>404</h1>;
  }

  // eslint-disable-next-line react/no-danger
  return (
    <>
      <h1>Work in progress</h1>
      <div dangerouslySetInnerHTML={{ __html: post?.html }} />
    </>
  );
};

export default Page;
