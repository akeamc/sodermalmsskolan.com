import React from "react";
import styles from "./Header.module.scss";

export class Header extends React.Component<{
  children: JSX.Element;
  backgroundImage?: string;
}> {
  render() {
    let { children, backgroundImage } = this.props;
    let style: React.CSSProperties = backgroundImage
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          color: "#fff",
          backgroundColor: "#000",
        }
      : {};

    return (
      <div className={styles.header} style={style}>
        <div
          className={styles.content}
          style={
            backgroundImage
              ? { backdropFilter: "brightness(60%)" }
              : {}
          }
        >
          <div className={styles.wrapper}>{children}</div>
        </div>
      </div>
    );
  }
}
