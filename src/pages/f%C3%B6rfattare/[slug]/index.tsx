import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Base from "../../../components/Base";
import PostListSection from "../../../components/blog/PostListSection";
import DigibruhArticleSection from "../../../components/digibruh/Section";
import SimpleHeader from "../../../components/header/Simple";
import InlineSkeleton from "../../../components/skeleton/InlineSkeleton";
import Author, { browseAuthors, getAuthor } from "../../../lib/ghost/author";
import Post from "../../../lib/ghost/post";
import NotFound from "../../404";

export const getStaticPaths: GetStaticPaths = async () => {
  const authors = await browseAuthors();

  const paths = authors.map((author) => ({
    params: { slug: author.slug },
  }));

  return { paths, fallback: true };
};

export interface PageProps {
  author: Author;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  try {
    const slug = params.slug?.toString();
    const author = await getAuthor({ slug });

    return {
      props: { author },
      revalidate: 30,
    };
  } catch (error) {
    return {
      props: {
        author: null,
      },
      revalidate: 1,
    };
  }
};

const Page: NextPage<PageProps> = ({
  author,
}) => {
  const router = useRouter();

  if (!author && !router.isFallback) {
    return <NotFound />;
  }

  const postFilter = (post: Post) => !!post?.authors.find(({ slug }) => slug === author?.slug);

  const authorNameComponent = author?.name || <InlineSkeleton width="4em" />;

  return (
    <Base metadata={{
      title: author?.name,
      description: author?.bio,
      images: [author?.profileImage],
      type: "profile",
    }}
    >
      <SimpleHeader title={author?.name || <InlineSkeleton />} sub={author?.bio} />
      <PostListSection
        header={{
          title: (
            <>
              Blogginlägg av
              {" "}
              {authorNameComponent}
            </>
          ),
          superTitle: "Blogg",
        }}
        filter={postFilter}
      />
      <DigibruhArticleSection
        header={{
          title: (
            <>
              Digibruh-artiklar av
              {" "}
              {authorNameComponent}
            </>
          ),
          superTitle: "Digibruh",
        }}
        filter={postFilter}
      />
    </Base>
  );
};

export default Page;
