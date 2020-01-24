import styles from "./Layout.module.css";
import React from "react";
import { Text } from "./Text";
import { Navigation } from "./Navigation";
import Head from "next/head";
import { Footer } from "./Footer";

export class Layout extends React.Component<{
  title?: string;
}> {
  render() {
    const { title } = this.props;

    return (
      <div>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Navigation></Navigation>
        <div className={styles.appWrapper}>
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
        <h1 className={styles.pageTitle}>
          <Text>{this.props.title}</Text>
        </h1>
      </div>
    );
  }
}
