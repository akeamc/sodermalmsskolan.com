import classNames from "classnames/bind";
import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type CardVariant = "normal" | "colorful";
export type CardSize = "medium" | "large";

export interface CardProps extends DetailedHTMLProps<
HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  variant?: CardVariant;
  size?: CardSize;
}

/**
 * A card.
 *
 * @param {React.PropsWithChildren<CardProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered card.
 */
const Card: FunctionComponent<CardProps> = ({
  variant = "normal",
  size = "medium",
  className,
  ...props
}) => (
  <div className={cx("card", variant, size, className)} {...props} />
);

export default Card;
