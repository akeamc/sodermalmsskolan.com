import Head from "next/head";
import React from "react";
import ANALYTICS_ID from "../../lib/analytics/constants";
import { MetaHead, SiteMetadata } from "./MetaHead";

export interface SiteHeadProps {
  metadata?: SiteMetadata;
}

/**
 * `<head>` including metadata and icons.
 *
 * @param {React.PropsWithChildren<SiteHeadProps>} props Props.
 *
 * @returns {React.ReactElement} Lots of meta tags.
 */
const SiteHead: React.FunctionComponent<SiteHeadProps> = ({ metadata = {} }) => (
  <>
    <MetaHead {...metadata} />

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
