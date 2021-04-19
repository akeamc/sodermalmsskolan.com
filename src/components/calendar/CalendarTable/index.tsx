import React, { FunctionComponent } from "react";
import classNames from "classnames/bind";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import DayColumn, { DayColumnHeading } from "./DayColumn";
import CalendarTableSidebar from "./CalendarTableSidebar";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type DaysSectionProps = React.DetailedHTMLProps<
React.HTMLAttributes<HTMLDivElement>, HTMLDivElement
>;

/**
 * Main section of the weekly calendar, without the sidebar.
 *
 * @param {React.PropsWithChildren<DaysSectionProps>} props Generic props.
 *
 * @returns {React.ReactElement} Rendered section.
 */
const DaysSection: FunctionComponent<DaysSectionProps> = ({
  className,
  ...props
}) => (
  <div
    className={cx("days-section", className)}
    {...props}
  />
);

/**
 * A calendar displaying one or more days.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const CalendarTable: FunctionComponent = () => {
  const { startOfScope, endOfScope } = useCalendarContext();

  const dayCount = endOfScope.diff(startOfScope, "days").days + 1;

  const dates = Array.from({ length: dayCount }).map((_, i) => startOfScope.plus({
    days: i,
  }));

  return (
    <div className={cx("wrapper")}>
      <DaysSection className={cx("head")}>
        {dates.map((date) => (
          <DayColumnHeading date={date} key={date.toISO()} />
        ))}
      </DaysSection>
      <div className={cx("body")}>
        <CalendarTableSidebar />
        <DaysSection>
          {dates.map((date) => (
            <DayColumn key={date.toISO()} date={date} />
          ))}
        </DaysSection>
      </div>
    </div>
  );
};

export default CalendarTable;
