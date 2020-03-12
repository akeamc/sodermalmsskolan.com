import React from "react";
import styles from "./Header.module.scss";

export class Header extends React.Component<{ children: JSX.Element }> {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.wrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}