import Head from "next/head";
import React, { FunctionComponent, useEffect } from "react";
import gtag from "../../lib/analytics/gtag";

export interface GoogleAnalyticsProps {
  trackingId: string;
}

/**
 * Google Analytics tracking snippet, as a React component. Handy, right?
 *
 * @param {React.PropsWithChildren<GoogleAnalyticsProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered code.
 */
const GoogleAnalytics: FunctionComponent<GoogleAnalyticsProps> = ({
  trackingId,
}) => {
  useEffect(() => {
    // Required for GA to function, as per the snippet.
    gtag("js", new Date());
    gtag("config", trackingId);
  }, [trackingId]);

  return (
    <Head>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}`,
        }}
      />
    </Head>
  );
};

export default GoogleAnalytics;
