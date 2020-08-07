import React from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { initGA, logPageView } from "../../lib/utils/analytics";
import GlobalStyles from "../../styles/global";

export class Layout extends React.Component<{
  title?: string;
  children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}> {
  componentDidMount() {
    if (!window["GA_INITIALIZED"]) {
      initGA();
      window["GA_INITIALIZED"] = true;
    }
    logPageView();
  }

  render() {
    const { title, children } = this.props;

    return (
      <div>
        <GlobalStyles />
        <Head>
          <title>
            {title ? title + " · södermalmsskolan.com" : "södermalmsskolan.com"}
          </title>
          <meta
            name="description"
            content="Vi visar vad Quality of Life Services egentligen betyder."
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
