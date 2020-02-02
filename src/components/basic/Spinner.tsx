import React from "react";
import styles from "./Spinner.module.scss";

export class Spinner extends React.Component {
  render() {
    return (
      <div className={styles.spinner}>
        <div className={styles.cube1}></div>
        <div className={styles.cube2}></div>
      </div>
    );
  }
}
