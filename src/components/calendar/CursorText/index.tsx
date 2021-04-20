import { AnimatePresence, motion, Variants } from "framer-motion";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import React, { FunctionComponent, useRef } from "react";
import { CalendarScope, useCalendarContext } from "../../../lib/calendar/CalendarContext";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import CursorWeekNumberBadge from "../CursorWeekNumberBadge";
import styles from "./index.module.scss";

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction * 100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: -direction * 100,
    opacity: 0,
    pointerEvents: "none",
  }),
};

export interface CursorTextProps {
  scope?: CalendarScope;
}

/**
 * Animated text displaying the current cursor in varying formats depending on the scope.
 *
 * @param {React.PropsWithChildren<CursorTextProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered elements!
 */
const CursorText: FunctionComponent<CursorTextProps> = ({
  scope: forcedScope,
}) => {
  const { cursor, loadingSchedules, scope: contextScope } = useCalendarContext();
  const prevCursorRef = useRef<DateTime>();

  const scope = forcedScope ?? contextScope;

  const content = capitalize(cursor.toLocaleString({
    month: "long",
    year: "numeric",
    day: scope === "day" ? "numeric" : undefined,
  }));

  const showWeekNumber = scope !== "month";

  let direction = prevCursorRef.current < cursor ? 1 : -1;

  if (prevCursorRef.current?.hasSame(cursor, "month")) {
    direction = 0; // Only fade if the month is the same.
  }

  prevCursorRef.current = cursor;

  return (
    <span className={styles.container}>
      {loadingSchedules ? <InlineSkeleton width="6em" /> : (
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={content}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              pointerEvents: "initial",
            }}
          >
            {content}
            {showWeekNumber ? <CursorWeekNumberBadge className={styles.badge} size="small" /> : undefined}
          </motion.div>
        </AnimatePresence>
      )}
    </span>
  );
};

export default CursorText;
