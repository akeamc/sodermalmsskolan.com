import React, { FunctionComponent } from "react";
import useTime from "../../../hooks/useTime";
import { getHumanReadableDuration } from "../../../lib/calendar/utils/humanReadable";
import secondsSinceMidnight from "../../../lib/calendar/utils/secondsSinceMidnight";
import Time from "../../typography/atomics/Time";

export interface HorizontalBarProps {
  color?: string;
  length?: string;
  top?: string | number;
  left?: string | number;
}

/**
 * A horizontal bar.
 *
 * @param {React.PropsWithChildren<HorizontalBarProps>} props Props.
 *
 * @returns {React.ReactElement} A rendered horizontal bar.
 */
const HorizontalBar: FunctionComponent<HorizontalBarProps> = ({
  color = "var(--border-color)",
  length = "calc(100% - var(--sidebar-width))",
  top = 0,
  left = "var(--sidebar-width)",
}) => (
  <hr css={{
    height: "1px",
    width: length,
    left,
    position: "absolute",
    backgroundColor: color,
    display: "block",
    border: 0,
    top,
    margin: 0,
  }}
  />
);

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
  <div
    css={{
      height: "var(--hour-height)",
      position: "relative",
      color: "var(--color-text-tertiary)",
      fontSize: 14,

      ":last-of-type": {
        height: "auto",
      },
    }}
  >
    <Time css={{
      position: "absolute",
      top: "-0.5em",
    }}
    >
      {getHumanReadableDuration(hours * 3600, true)}
    </Time>
    {hours < 24 ? (
      <>
        <HorizontalBar top="25%" left="0" length="32px" />
        <HorizontalBar top="50%" left="0" length="48px" />
        <HorizontalBar top="75%" left="0" length="32px" />
      </>
    ) : undefined}
    <HorizontalBar />
  </div>
);

/**
 * Small tag floating along on the sidebar, indicating the current time.
 *
 * @returns {React.ReactElement} The rendered indicator.
 */
const SidebarIndicator: FunctionComponent = () => {
  const now = useTime();
  const hours = secondsSinceMidnight(now.toDate()) / 3600;

  return (
    <div
      css={{
        position: "absolute",
        width: "100%",
        zIndex: 1,
      }}
      style={{
        top: `calc(var(--hour-height) * ${hours})`,
      }}
    >
      <Time css={{
        position: "absolute",
        transform: "translateY(-50%)",
        display: "inline-block",
        backgroundColor: "var(--color-bg-danger)",
        color: "#fff",
        fontSize: 14,
        padding: "4px 0",
        textAlign: "center",
        borderRadius: 6,
        fontWeight: 500,
        width: "calc(var(--sidebar-width) - var(--cell-spacing))",
      }}
      >
        {now.format("HH:mm")}
      </Time>
      <HorizontalBar color="var(--color-border-danger)" />
    </div>
  );
};

/**
 * A sidebar for the weekly calendar, showing the current time and a nice scale.
 *
 * @returns {React.ReactElement} The rendered sidebar.
 */
const WeeklyCalendarSidebar: FunctionComponent = () => (
  <div css={{
    position: "absolute",
    width: "100%",
    height: "100%",
  }}
  >
    {/* IMPORTANT! Do not place any div element after the SidebarLabels as CSS selectors are
    in use. */}
    <SidebarIndicator />
    {Array.from({
      length: 25,
    }).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <SidebarLabel hours={i} key={i} />
    ))}
  </div>
);

export default WeeklyCalendarSidebar;
