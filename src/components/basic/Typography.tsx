import styles from "./Typography.module.scss";
import React from "react";

interface ITextContainer {
  children: (JSX.Element | string) | (JSX.Element | string)[];
}

export class Text extends React.Component<
  ITextContainer & {
    className?: string;
  }
> {
  render() {
    return (
      <span className={(this.props.className || "") + " " + styles.text}>
        {this.props.children}
      </span>
    );
  }
}

export class Paragraph extends React.Component<ITextContainer> {
  render() {
    return (
      <p>
        <Text>{this.props.children}</Text>
      </p>
    );
  }
}

export class H1 extends React.Component<ITextContainer> {
  render() {
    return (
      <h1 className={styles.h1}>
        <Text>{this.props.children}</Text>
      </h1>
    );
  }
}

export class H2 extends React.Component<ITextContainer> {
  render() {
    return (
      <h2 className={styles.h2}>
        <Text>{this.props.children}</Text>
      </h2>
    );
  }
}

export class H3 extends React.Component<ITextContainer> {
  render() {
    return (
      <h3 className={styles.h3}>
        <Text>{this.props.children}</Text>
      </h3>
    );
  }
}

export class H4 extends React.Component<ITextContainer> {
  render() {
    return (
      <h4 className={styles.h4}>
        <Text>{this.props.children}</Text>
      </h4>
    );
  }
}

export class H5 extends React.Component<ITextContainer> {
  render() {
    return (
      <h5 className={styles.h5}>
        <Text>{this.props.children}</Text>
      </h5>
    );
  }
}

export class H6 extends React.Component<ITextContainer> {
  render() {
    return (
      <h6 className={styles.h6}>
        <Text>{this.props.children}</Text>
      </h6>
    );
  }
}

export class D1 extends React.Component<ITextContainer> {
  render() {
    return (
      <h2 className={styles.d1}>
        <Text>{this.props.children}</Text>
      </h2>
    );
  }
}

export class D2 extends React.Component<ITextContainer> {
  render() {
    return (
      <h2 className={styles.d2}>
        <Text>{this.props.children}</Text>
      </h2>
    );
  }
}

export class D3 extends React.Component<ITextContainer> {
  render() {
    return (
      <h2 className={styles.d3}>
        <Text>{this.props.children}</Text>
      </h2>
    );
  }
}