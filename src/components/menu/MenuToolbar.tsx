import classNames from "classnames";
import React, {
  ButtonHTMLAttributes, DetailedHTMLProps, FunctionComponent, HTMLAttributes,
} from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
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
        "text-blue-500 leading-tight hover:text-blue-300 dark:hover:text-blue-700 transition-colors whitespace-nowrap",
        className,
      )}
      onClick={() => moveCursor(delta)}
      type="button"
      {...props}
    >
      {delta < 0 ? <ChevronLeft className="inline mr-1 -mt-1 w-4 h-4" strokeWidth="3" /> : undefined}
      <MenuCursor cursor={cursor?.plus({ [scope]: delta })} />
      {delta > 0 ? <ChevronRight className="inline ml-1 -mt-1 w-4 h-4" strokeWidth="3" /> : undefined}
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
