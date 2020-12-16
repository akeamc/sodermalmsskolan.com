import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Base from "../../../components/Base";
import PostListSection from "../../../components/blog/PostListSection";
import DigibruhArticleSection from "../../../components/digibruh/Section";
import Footer from "../../../components/footer/Footer";
import SimpleHeader from "../../../components/header/Simple";
import Skeleton from "../../../components/Skeleton";
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

  return (
    <Base metadata={{
      title: author?.name,
      description: author?.bio,
      images: [author?.profileImage],
      type: "profile",
    }}
    >
      <SimpleHeader title={author?.name || <Skeleton />} sub={author?.bio} />
      <PostListSection
        header={{
          title: `Blogginlägg av ${author?.name}`,
          superTitle: "Blogg",
        }}
        filter={postFilter}
      />
      <DigibruhArticleSection
        header={{
          title: `Digibruh-artiklar av ${author?.name}`,
          superTitle: "Digibruh",
        }}
        filter={postFilter}
      />
      <Footer />
    </Base>
  );
};

export default Page;
