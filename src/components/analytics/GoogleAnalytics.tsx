import Head from "next/head";
import React, { FunctionComponent, useEffect } from "react";

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
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (window as any).dataLayer = (window as any).dataLayer || [];
    // eslint-disable-next-line func-names
    (window as any).gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      (window as any).dataLayer.push(arguments);
    };

    // Required for GA to function, as per the snippet.
    (window as any).gtag("js", new Date());
    (window as any).gtag("config", trackingId);
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }, [trackingId]);

  return (
    <Head>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
    </Head>
  );
};

export default GoogleAnalytics;
