import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ANALYTICS_ID } from "../../lib/google/constants";

export interface SiteMetadata {
  title?: string;
  description?: string;
  type?: string;
  images?: string[];

  /**
   * Data to be specified if the `type` property is set to `article`.
   */
  article?: {
    published?: Date,
    modified?: Date,
  }
}

export const MetaHead: React.FunctionComponent<{ metadata: SiteMetadata }> = ({
  metadata,
}) => {
  const {
    title,
    description = "Vi visar den verkliga innebörden av Sodexos slogan Quality of Life Services.",
    type = "website",
    images = [
      "https://cdn.discordapp.com/attachments/575993879837409290/588012243745243136/IMG_20190611_161511.jpg",
    ],
    article,
  } = metadata;

  const titleFragments = ["södermalmsskolan.com"];

  if (title) {
    titleFragments.unshift(title);
  }

  const metaTitle = titleFragments.join(" · ");

  const router = useRouter();

  const canonical = new URL(router.asPath, "https://södermalmsskolan.com").href;

  return (
    <Head>
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

      {article ? (
        <>
          {article?.published ? <meta property="og:article:published_time" content={article.published.toISOString()} /> : null}
          {article?.modified ? <meta property="og:article:modified_time" content={article.modified.toISOString()} /> : null}
        </>
      ) : null}
    </Head>
  );
};

const SiteHead: React.FunctionComponent<{
  metadata?: SiteMetadata;
}> = ({ metadata = {} }) => (
  <>
    <MetaHead metadata={metadata} />

    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <script
        async
        src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />

      {/* Global site tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ANALYTICS_ID}');`,
        }}
      />
    </Head>
  </>
);

export default SiteHead;
