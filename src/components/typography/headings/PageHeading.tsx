import React, { FunctionComponent } from "react";
import styles from "./PageHeading.module.scss";

/**
 * Main page heading.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} Rendered heading.
 */
const PageHeading: FunctionComponent = (props) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h1
    className={styles.heading}
    {...props}
  />
);

export default PageHeading;
