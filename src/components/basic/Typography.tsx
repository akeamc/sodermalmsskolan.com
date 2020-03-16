import styles from "./Typography.module.scss";
import React from "react";

interface ITextContainer {
  children: (JSX.Element | string) | (JSX.Element | string)[];
}

export class D1 extends React.Component<ITextContainer> {
  render() {
    return <h1 className={styles.d1}>{this.props.children}</h1>;
  }
}

export class D2 extends React.Component<ITextContainer> {
  render() {
    return <h2 className={styles.d2}>{this.props.children}</h2>;
  }
}

export class D3 extends React.Component<ITextContainer> {
  render() {
    return <h3 className={styles.d3}>{this.props.children}</h3>;
  }
}
