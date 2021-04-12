import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import React, { FunctionComponent, memo } from "react";
import { getHumanReadableDuration } from "../../../lib/calendar/utils/humanReadable";
import styles from "./CalendarTableSidebar.module.scss";

const cx = classNames.bind(styles);

export interface SidebarLabelProps {
  hours: number;
}

/**
 * A label on the sidebar.
 *
 * @param {React.PropsWithChildren<SidebarLabelProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered label.
 */
const SidebarLabel: FunctionComponent<SidebarLabelProps> = ({
  hours,
}) => (
  <div className={cx("label")}>
    <time>
      {getHumanReadableDuration(hours * 3600, true)}
    </time>
    {hours < 24 ? (
      <div>
        <hr className={cx("quarter-hour-bar")} />
        <hr className={cx("quarter-hour-bar")} />
        <hr className={cx("quarter-hour-bar")} />
      </div>
    ) : undefined}
    <hr className={cx("full-width-bar")} />
  </div>
);

/**
 * A sidebar for the weekly calendar, showing the current time and a nice scale.
 *
 * @returns {React.ReactElement} The rendered sidebar.
 */
const CalendarTableSidebar: FunctionComponent = () => {
  const CalendarTableSidebarIndicator = dynamic(() => import("./CalendarTableSidebarIndicator"), {
    ssr: false,
  });

  return (
    <div className={cx("sidebar")}>
      {/* IMPORTANT! Do not place any div element after the SidebarLabels as CSS selectors are
      in use. */}
      <CalendarTableSidebarIndicator />
      {Array.from({
        length: 25,
      }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <SidebarLabel hours={i} key={i} />
      ))}
    </div>
  );
};

export default memo(CalendarTableSidebar);
