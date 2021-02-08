import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import Base from "../components/Base";
import RichText from "../components/post/RichText";
import Section from "../components/section/Section";
import { HeaderHeading } from "../components/text/headings";
import { GhostStaticPathParams } from "../lib/ghost/common";
import Page, { browsePages, readPage } from "../lib/ghost/page";

export interface PagePageProps {
  page: Page;
}

/**
 * Generate paths to the pages at build time.
 *
 * @returns {Promise<import("next").GetStaticPathsResult<GhostStaticPathParams>>} The static paths.
 */
export const getStaticPaths: GetStaticPaths<GhostStaticPathParams> = async () => {
  const pages = await browsePages();

  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false };
};

/**
 * Pre-fetch all Ghost pages.
 *
 * @param {import("next").GetStaticPropsContext<GhostStaticPathParams>} context Context.
 *
 * @returns {Promise<import("next").GetStaticPropsResult<PagePageProps>>} Props.
 */
export const getStaticProps: GetStaticProps<PagePageProps, GhostStaticPathParams> = async ({
  params,
}) => {
  const slug = params.slug?.toString();
  const page = await readPage({ slug });

  return {
    props: { page },
    revalidate: 30,
  };
};

/**
 * A page that renders pages from the Ghost CMS.
 *
 * @param {PagePageProps} props Props.
 *
 * @returns {React.ReactElement} Rendered page.
 */
const GhostPagePage: NextPage<PagePageProps> = ({
  page,
}) => (
  <Base metadata={{
    title: page?.title,
    description: page?.excerpt,
    images: [page?.cover],
    type: "website",
  }}
  >
    <Section containerProps={{
      width: "narrow",
    }}
    >
      <header css={{
        textAlign: "center",
        marginBottom: "2rem",
      }}
      >
        <HeaderHeading>{page?.title}</HeaderHeading>
      </header>
      <RichText html={page?.html} />
    </Section>
  </Base>
);

export default GhostPagePage;
