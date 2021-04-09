import classNames from "classnames/bind";
import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type CardVariant = "normal" | "colorful";

export interface CardProps extends DetailedHTMLProps<
HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  variant?: CardVariant;
}

/**
 * A card.
 *
 * @param {React.PropsWithChildren<CardProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered card.
 */
const Card: FunctionComponent<CardProps> = ({
  className,
  variant = "normal",
  ...props
}) => (
  <div className={cx("card", variant, className)} {...props} />
);

export default Card;
