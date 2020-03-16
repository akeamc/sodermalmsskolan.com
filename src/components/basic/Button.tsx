import React from "react";
import styles from "./Button.module.scss";

export class Button extends React.Component<{
  children: (JSX.Element | string) | (JSX.Element | string)[];
}> {
  render() {
    const { children } = this.props;
    return <button className={styles.button}>{children}</button>;
  }
}
