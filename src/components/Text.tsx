import styles from "./Text.module.css";
import React from "react";

export class Text extends React.Component<{ children: string }> {
  render() {
    return <span className={styles.text}>{this.props.children}</span>;
  }
}

export class Paragraph extends React.Component<{ children: string }> {
  render() {
    return (
      <p>
        <Text>{this.props.children}</Text>
      </p>
    );
  }
}

export class Heading extends React.Component<{ children: string }> {
  render() {
    return (
      <h1 className={styles.h1}>
        <Text>{this.props.children}</Text>
      </h1>
    );
  }
}
