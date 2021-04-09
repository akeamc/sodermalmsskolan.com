import classNames from "classnames/bind";
import React, { FunctionComponent } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * A button.
 *
 * @param {React.PropsWithChildren<ButtonProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered button.
 */
const Button: FunctionComponent<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  className,
  type = "button",
  ...props
}) => (
  <button
    className={cx("base", variant, size, className)}
    // eslint-disable-next-line react/button-has-type
    type={type}
    {...props}
  />
);

export default Button;
