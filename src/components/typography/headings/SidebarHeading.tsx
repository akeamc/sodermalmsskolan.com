import classNames from "classnames/bind";
import React, { FunctionComponent } from "react";
import HeadingProps from "../types/HeadingProps";
import styles from "./SidebarHeading.module.scss";

const cx = classNames.bind(styles);

/**
 * Heading for sidebars.
 *
 * @param {React.PropsWithChildren<HeadingProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered heading.
 */
const SidebarHeading: FunctionComponent<HeadingProps> = ({
  className,
  ...props
}) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h3 className={cx("heading", className)} {...props} />
);

export default SidebarHeading;
