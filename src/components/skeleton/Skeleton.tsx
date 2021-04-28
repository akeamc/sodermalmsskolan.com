import classNames from "classnames/bind";
import React, { FunctionComponent } from "react";
import styles from "./Skeleton.module.scss";

const cx = classNames.bind(styles);

export interface SkeletonProps extends React.DetailedHTMLProps<
React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement
> {
  width?: string;
  height?: string;
}

/**
 * A loading skeleton, used as a placeholder.
 *
 * @param {React.PropsWithChildren<SkeletonProps>} props Props.
 *
 * @returns {React.ReactElement} The skeleton.
 */
const Skeleton: FunctionComponent<SkeletonProps> = ({
  className, width, height, ...props
}) => (
  <span
    className={cx("skeleton", className)}
    style={{
      width,
      height,
    }}
    {...props}
  />
);

export default Skeleton;
