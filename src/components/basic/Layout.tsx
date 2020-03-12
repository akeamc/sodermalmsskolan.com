import styles from "./Layout.module.scss";
import React from "react";
import { Navigation } from "./Navigation";
import Head from "next/head";
import { Footer } from "./Footer";
import { initGA, logPageView } from "../../utils/analytics";

export class Layout extends React.Component<{
  title?: string;
  children: JSX.Element[] | JSX.Element;
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
        <Head>
          <title>
            {title ? title + " - södermalmsskolan.com" : "södermalmsskolan.com"}
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
          <script
            async
            src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        </Head>
        <div>
          <Navigation></Navigation>
          {children}
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
