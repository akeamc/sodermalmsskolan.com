import classNames from "classnames";
import React, {
  ButtonHTMLAttributes, DetailedHTMLProps, FunctionComponent, HTMLAttributes,
} from "react";
import { useMenuContext } from "../../lib/food/MenuContext";
import MenuCursor from "./MenuCursor";
import styles from "./MenuToolbar.module.scss";

export interface MenuToolbarButtonProps extends DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
> {
  delta: number;
}

/**
 * A button for the menu toolbar.
 *
 * @param {React.PropsWithChildren<MenuToolbarButtonProps>} props Props.
 *
 * @returns {React.ReactElement} The button.
 */
export const MenuToolbarButton: FunctionComponent<MenuToolbarButtonProps> = ({
  delta,
  className,
  ...props
}) => {
  const { cursor, moveCursor, scope } = useMenuContext();

  return (
    <button
      className={classNames(
        "text-blue-500 leading-tight border-b-2 border-blue-100 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 transition-all whitespace-nowrap",
        className,
      )}
      onClick={() => moveCursor(delta)}
      type="button"
      {...props}
    >
      <MenuCursor cursor={cursor?.plus({ [scope]: delta })} />
    </button>
  );
};

export type MenuToolbarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * A toolbar for the menu.
 *
 * @param {React.PropsWithChildren<MenuToolbarProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered toolbar.
 */
const MenuToolbar: FunctionComponent<MenuToolbarProps> = ({
  className,
  ...props
}) => (
  <div className={classNames("my-4 gap-1", styles.container, className)} {...props}>
    <div>
      <MenuToolbarButton delta={-1} title="Föregående" className="mr-auto" />
    </div>
    <div>
      <h2 className="text-sm text-center text-gray-900 dark:text-gray-300 font-semibold tracking-widest uppercase flex-1">
        <MenuCursor showYear />
      </h2>
    </div>
    <div>
      <MenuToolbarButton delta={1} title="Nästa" className="ml-auto" />
    </div>
  </div>
);

export default MenuToolbar;
