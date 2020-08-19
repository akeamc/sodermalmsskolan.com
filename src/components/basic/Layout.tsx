import React from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { initGA, logPageView } from "../../lib/utils/analytics";
import { useRouter } from "next/router";

export interface SiteMetadata {
  title?: string;
  description?: string;
  type?: string;
  images?: string[];
}

const SiteMetadata: React.FunctionComponent<{ metadata: SiteMetadata }> = ({
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

  let titleFragments = ["södermalmsskolan.com"];
  title && titleFragments.unshift(title);
  const metaTitle = titleFragments.join(" · ");

  const router = useRouter();

  const canonical = `https://södermalmsskolan.com/${router.asPath}`;

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

export class Layout extends React.Component<{
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  metadata?: SiteMetadata;
}> {
  componentDidMount() {
    if (!window["GA_INITIALIZED"]) {
      initGA();
      window["GA_INITIALIZED"] = true;
    }
    logPageView();
  }

  render() {
    const { children, metadata = {} } = this.props;

    return (
      <div>
        <SiteMetadata metadata={metadata} />

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
        </Head>
        <div>
          {children}
          <Footer />
        </div>
      </div>
    );
  }
}
