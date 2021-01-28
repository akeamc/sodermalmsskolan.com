import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";

export type OgType = "website" | "article" | "music" | "video" | "book" | "profile";

export interface SiteMetadata {
  title?: string;
  description?: string;
  type?: OgType;
  images?: string[];
  noIndex?: boolean;

  /**
   * Data to be specified if the `type` property is set to `article`.
   */
  article?: {
    published?: Date,
    modified?: Date,
  }
}

/**
 * Universal SSO god.
 *
 * @param {React.PropsWithChildren<SiteMetadata>} props Props.
 *
 * @returns {React.ReactElement} The rendered meta tags.
 */
export const MetaHead: FunctionComponent<{ metadata: SiteMetadata }> = ({
  metadata,
}) => {
  const {
    title,
    description = "Vi visar den verkliga innebörden av Sodexos slogan Quality of Life Services.",
    type = "website",
    images = [
      "https://cdn.discordapp.com/attachments/575993879837409290/588012243745243136/IMG_20190611_161511.jpg",
    ],
    noIndex = false,
    article,
  } = metadata;

  const titleFragments = ["södermalmsskolan.com"];

  if (title) {
    titleFragments.unshift(title);
  }

  const metaTitle = titleFragments.join(" · ");

  const router = useRouter();

  const canonical = new URL(router?.asPath, "https://södermalmsskolan.com").href;

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content="södermalmsskolan.com" />
      <meta property="og:title" content={titleFragments[0]} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />

      {images.map((image) => (
        <meta key={image} property="og:image" content={image} />
      ))}

      {noIndex ? <meta name="robots" content="noindex" /> : null}

      {article ? (
        <>
          {article?.published ? <meta property="og:article:published_time" content={article.published.toISOString()} /> : null}
          {article?.modified ? <meta property="og:article:modified_time" content={article.modified.toISOString()} /> : null}
        </>
      ) : null}
    </>
  );
};
