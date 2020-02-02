import styles from "./Layout.module.scss";
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
