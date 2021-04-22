import classNames from "classnames/bind";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { FunctionComponent } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type BadgeSize = "small" | "medium";

export interface BadgeProps extends HTMLMotionProps<"span"> {
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
  <motion.span
    className={cx("badge", size, className)}
    initial={{ y: "100%", opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: "-100%", opacity: 0 }}
    {...props}
  />
);

export default Badge;
