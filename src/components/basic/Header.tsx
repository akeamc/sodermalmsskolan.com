import React from "react";
import styles from "./Header.module.scss";

export class Header extends React.Component<{ children: JSX.Element }> {
  render() {
    return (
      <div className={styles.header}>
        {this.props.children}
      </div>
    );
  }
}