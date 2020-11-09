import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { GA_TRACKING_ID } from "../../../lib/google/analytics";

export interface SiteMetadata {
  title?: string;
  description?: string;
  type?: string;
  images?: string[];
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
      {images.map((image, index) => (
        <meta key={index} property="og:image" content={image} />
      ))}
    </Head>
  );
};

export const DefaultHead: React.FunctionComponent<{
  metadata?: SiteMetadata;
}> = ({ metadata = {} }) => {
  return (
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

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
          integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
          crossOrigin="anonymous"
        />

        <script
          async
          src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />

        {/* Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');`,
          }}
        />
      </Head>
    </>
  );
};
