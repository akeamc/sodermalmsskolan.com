import { DateTime, DurationObjectUnits } from "luxon";
import React, {
  createContext, FunctionComponent, useCallback, useContext, useEffect, useState,
} from "react";

export type MenuScope = "week" | "month";
export type MoveCursor = (steps: number, granuality?: keyof DurationObjectUnits) => void;

export interface MenuContextData {
  cursor: DateTime;
  setCursor: (newCursor: DateTime) => void;
  moveCursor: MoveCursor;
  scope: MenuScope;
}

const MenuContext = createContext<MenuContextData>({
  cursor: DateTime.utc(),
  setCursor: () => {
    throw new Error("`setCursor` is not implemented.");
  },
  moveCursor: () => {
    throw new Error("`moveCursor` is not implemented.");
  },
  scope: "week",
});

export interface MenuContextProviderProps {
  initialCursor?: DateTime;
}

/**
 * A provider for `MenuContext`.
 *
 * @param {React.PropsWithChildren<MenuContextProviderProps>} props Generic props.
 *
 * @returns {React.ReactElement} The context provider.
 */
export const MenuContextProvider: FunctionComponent<MenuContextProviderProps> = ({
  initialCursor,
  children,
}) => {
  const scope: MenuScope = "week";

  const [cursor, setCursor] = useState<DateTime>();

  useEffect(() => {
    setCursor(initialCursor ?? DateTime.now());
  }, [initialCursor]);

  /**
   * Move the cursor `steps` number of scopes forward or backward.
   *
   * @param {number} months How many months to jump.
   * @param {keyof DurationObjectUnits} granuality Granuality.
   */
  const moveCursor: MoveCursor = useCallback((steps, granuality = scope) => {
    setCursor(cursor.plus({
      [granuality]: steps,
    }).startOf(granuality));
  }, [cursor, scope]);

  return (
    <MenuContext.Provider value={{
      cursor,
      setCursor,
      moveCursor,
      scope,
    }}
    >
      {children}
    </MenuContext.Provider>
  );
};

/**
 * Use the menu context.
 *
 * @returns {MenuContextData} Menu context data.
 */
export const useMenuContext = (): MenuContextData => useContext(MenuContext);

export default MenuContext;
