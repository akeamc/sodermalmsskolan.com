import classNames from "classnames";
import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import { useMenuContext } from "../../lib/food/MenuContext";
import MenuCursor from "./MenuCursor";

export interface MenuToolbarButtonProps {
  delta: number;
  title: string;
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
  title,
}) => {
  const { cursor, moveCursor, scope } = useMenuContext();

  return (
    <button
      className="text-blue-500 leading-tight border-b-2 border-blue-100 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 transition-all"
      onClick={() => moveCursor(delta)}
      type="button"
      title={title}
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
  <div className={classNames("flex justify-between items-center my-4", className)} {...props}>
    <MenuToolbarButton delta={-1} title="Föregående" />
    <h2 className="text-sm text-gray-900 dark:text-gray-300 font-semibold tracking-widest uppercase">
      <MenuCursor showYear />
    </h2>
    <MenuToolbarButton delta={1} title="Nästa" />
  </div>
);

export default MenuToolbar;
