import styles from "./Text.module.css";
import React from "react";

export class Text extends React.Component<{
  className?: string;
  children: string;
}> {
  render() {
    return (
      <span className={(this.props.className || "") + " " + styles.text}>
        {this.props.children}
      </span>
    );
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

export class H1 extends React.Component<{ children: string }> {
  render() {
    return (
      <h1 className={styles.h1}>
        <Text>{this.props.children}</Text>
      </h1>
    );
  }
}

export class H2 extends React.Component<{ children: string }> {
  render() {
    return (
      <h2 className={styles.h2}>
        <Text>{this.props.children}</Text>
      </h2>
    );
  }
}
