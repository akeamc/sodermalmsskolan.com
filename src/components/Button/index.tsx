import classNames from "classnames/bind";
import React, { ComponentType, FunctionComponent } from "react";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonIcon = ComponentType<
React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;

export interface ButtonProps extends React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
> {
  variant?: ButtonVariant;
  size?: ButtonSize;

  /**
   * Use this property if the only child of the button should be an icon.
   */
  icon?: ButtonIcon;

  /**
   * Icon placed on the left.
   */
  leftIcon?: ButtonIcon;

  /**
   * Icon placed on the right.
   */
  rightIcon?: ButtonIcon;

  disabled?: boolean;
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
  icon: Icon,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  disabled,
  ...props
}) => (
  <button
    className={cx("base", variant, size, className, {
      "icon-only": typeof Icon !== "undefined",
      disabled,
    })}
    // eslint-disable-next-line react/button-has-type
    type={type}
    {...props}
  >
    {LeftIcon ? <LeftIcon className={cx("icon", "left-icon")} /> : undefined}
    {children}
    {Icon ? <Icon className={cx("icon")} /> : undefined}
    {RightIcon ? <RightIcon className={cx("icon", "right-icon")} /> : undefined}
  </button>
);

export default Button;
