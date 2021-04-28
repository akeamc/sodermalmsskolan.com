import React, { FunctionComponent } from "react";
import styles from "./Skeleton.module.scss";

/**
 * A loading skeleton, used as a placeholder.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} The skeleton.
 */
const Skeleton: FunctionComponent = (props) => (
  <span
    className={styles.skeleton}
    {...props}
  />
);

export default Skeleton;
