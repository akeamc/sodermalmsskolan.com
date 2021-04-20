import classNames from "classnames/bind";
import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type BadgeSize = "small" | "medium";

export interface BadgeProps extends DetailedHTMLProps<
HTMLAttributes<HTMLSpanElement>, HTMLSpanElement
> {
  size?: BadgeSize;
}

/**
 * A badge.
 *
 * @param {React.PropsWithChildren<BadgeProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered badge.
 */
const Badge: FunctionComponent<BadgeProps> = ({
  className,
  size = "medium",
  ...props
}) => (
  <span
    className={cx("badge", size, className)}
    {...props}
  />
);

export default Badge;
