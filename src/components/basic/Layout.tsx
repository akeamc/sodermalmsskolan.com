import styles from "./Layout.module.scss";
import React from "react";
import { Text } from "./Text";
import { Navigation } from "./Navigation";
import Head from "next/head";
import { Footer } from "./Footer";
import { initGA, logPageView } from "../../utils/analytics";

export class Layout extends React.Component<{
  title?: string;
}> {
  componentDidMount() {
    if (!window["GA_INITIALIZED"]) {
      initGA();
      window["GA_INITIALIZED"] = true;
    }
    logPageView();
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <Head>
          <title>södermalmsskolan.com</title>
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
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          ></link>
          <link rel="manifest" href="/site.webmanifest"></link>
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg"
            color="#000000"
          ></link>
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className={styles.appWrapper}>
          <Navigation></Navigation>
          {title && <Header title={title}></Header>}
          {this.props.children}
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

class Header extends React.Component<{ title: string }> {
  render() {
    return (
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>
          <Text className={styles.pageTitle}>{this.props.title}</Text>
        </h2>
      </div>
    );
  }
}
