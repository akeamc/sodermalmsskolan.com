import { capitalize } from "lodash";
import { DateTime } from "luxon";
import React, { FunctionComponent } from "react";
import { MenuScope, useMenuContext } from "../../lib/food/MenuContext";
import InlineSkeleton from "../skeleton/InlineSkeleton";

export interface MenuCursorProps {
  cursor?: DateTime;
  scope?: MenuScope;
  showYear?: boolean;
}

/**
 * A cursor for the menu.
 *
 * @param {React.PropsWithChildren<MenuCursorProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered cursor.
 */
const MenuCursor: FunctionComponent<MenuCursorProps> = ({
  cursor: forcedCursor,
  scope: forcedScope,
  showYear = false,
}) => {
  const { cursor: contextCursor, scope: contextScope } = useMenuContext();

  const cursor = forcedCursor ?? contextCursor;
  const scope = forcedScope ?? contextScope;

  if (!cursor) {
    return (
      <InlineSkeleton width="6em" />
    );
  }

  switch (scope) {
    case "week":
      return (
        <>
          Vecka
          {" "}
          {cursor?.weekNumber}
          {showYear ? ` ${cursor?.year}` : undefined}
        </>
      );
    case "month":
      return (
        <>
          {capitalize(cursor.toLocaleString({
            month: "long",
            year: "numeric",
          }))}
        </>
      );
    default:
      return (
        <>
          {cursor?.toLocaleString(DateTime.DATE_FULL)}
        </>
      );
  }
};

export default MenuCursor;
