import dayjs from "dayjs";
import React, { FunctionComponent, useMemo, useState } from "react";
import useLocale from "../../hooks/useLocale";
import CalendarEventInstance from "../../lib/calendar/event/CalendarEventInstance";
import capitalize from "../../lib/utils/capitalize";
import { breakpoints, media } from "../../styles/breakpoints";
import SegmentedControl from "../form/SegmentedControl";
import { FormOption } from "../form/types";
import CalendarDay from "./Day";

export interface CalendarWeekProps {
  dayCount?: number;
  eventInstances: CalendarEventInstance[];
  placeholder?: boolean;
}

const CalendarWeek: FunctionComponent<CalendarWeekProps> = ({
  dayCount = 7,
  eventInstances,
  placeholder = false,
}) => {
  const { language } = useLocale();

  const weekdayControlOptions: FormOption[] = useMemo(() => {
    const options: FormOption[] = Array.from({
      length: dayCount,
    }).map((_, index) => ({
      value: index.toString(),
      label: capitalize(dayjs().locale(language).isoWeekday(index + 1).format("dddd")),
    }));

    return options;
  }, [dayCount, language]);

  const [activeTab, setActiveTab] = useState<string>(() => {
    const weekday = (dayjs().isoWeekday() + 6) % 7;

    return Math.min(weekday, dayCount - 1).toString();
  });

  return (
    <div>
      <div css={{
        margin: "2rem 0",

        [media(breakpoints.large)]: {
          display: "none",
        },
      }}
      >
        <SegmentedControl
          options={weekdayControlOptions}
          onChange={setActiveTab}
          value={activeTab}
        />
      </div>
      <div css={{
        marginLeft: "var(--labels-width)",

        [media(breakpoints.large)]: {
          display: "flex",
          height: "calc(var(--rows) * var(--row-height)) + var(--header-height)",
        },
      }}
      >
        {Array.from({ length: dayCount })
          .map((_, weekday) => (
            <CalendarDay
              eventInstances={
                eventInstances
                  .filter(({ start }) => (start.getDay() + 6) % 7 === weekday)
                }
              // eslint-disable-next-line react/no-array-index-key
              key={weekday}
              weekday={weekday}
              placeholder={placeholder}
              active={weekday === parseInt(activeTab, 10)}
            />
          ))}
      </div>
    </div>
  );
};

export default CalendarWeek;
