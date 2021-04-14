import { AnimatePresence, motion, Variants } from "framer-motion";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import React, { FunctionComponent, useRef } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
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

/**
 * Animated text displaying the current month and year.
 *
 * @returns {React.ReactElement} Rendered elements!
 */
const MonthText: FunctionComponent = () => {
  const { cursor, loadingSchedules } = useCalendarContext();
  const prevCursorRef = useRef<DateTime>();

  const content = capitalize(cursor.toLocaleString({
    month: "long",
    year: "numeric",
  }));

  const isBefore = prevCursorRef.current < cursor;

  const direction = isBefore ? 1 : -1;

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
          </motion.div>
        </AnimatePresence>
      )}
    </span>
  );
};

export default MonthText;
