import classNames from "classnames/bind";
import React, { FunctionComponent } from "react";
import styles from "./VerticalStack.module.scss";

const cx = classNames.bind(styles);

export type VerticalStackProps = React.DetailedHTMLProps<
React.HTMLAttributes<HTMLUListElement>, HTMLUListElement
>;

/**
 * A vertical stack (`ul` with fancy styles).
 *
 * @param {React.PropsWithChildren<VerticalStackProps>} props Generic props.
 *
 * @returns {React.ReactElement} The rendered list.
 */
const VerticalStack: FunctionComponent<VerticalStackProps> = ({
  className,
  ...props
}) => (
  <ul className={cx("ul", className)} {...props} />
);

export default VerticalStack;
