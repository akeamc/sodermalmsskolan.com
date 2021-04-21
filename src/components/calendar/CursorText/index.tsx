import classNames from "classnames/bind";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import React, { FunctionComponent, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { CalendarScope, useCalendarContext } from "../../../lib/calendar/CalendarContext";
import Button, { ButtonProps } from "../../Button";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import CursorWeekNumberBadge from "../CursorWeekNumberBadge";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

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
  controls?: "left" | "right";
}

/**
 * Animated text displaying the current cursor in varying formats depending on the scope.
 *
 * @param {React.PropsWithChildren<CursorTextProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered elements!
 */
const CursorText: FunctionComponent<CursorTextProps> = ({
  controls,
  scope: forcedScope,
}) => {
  const {
    cursor,
    loadingSchedules,
    scope: contextScope,
    moveCursor,
  } = useCalendarContext();
  const prevCursorRef = useRef<DateTime>();

  const scope = forcedScope ?? contextScope;

  const content = capitalize(cursor.toLocaleString({
    month: "long",
    year: "numeric",
    day: scope === "day" ? "numeric" : undefined,
  }));

  const showWeekNumber = scope !== "month";

  const direction = prevCursorRef.current < cursor ? 1 : -1;

  prevCursorRef.current = cursor;

  const buttonProps: ButtonProps = {
    type: "button",
    variant: "secondary",
    size: "small",
  };

  return (
    <div className={cx("container", controls)}>
      <div className={cx("track")}>
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
              {showWeekNumber ? <CursorWeekNumberBadge className={cx("badge")} size="small" /> : undefined}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      {controls ? (
        <div className={cx("controls")}>
          <Button onClick={() => moveCursor(-1, scope)} icon={ChevronLeft} title="Föregående" {...buttonProps} />
          <Button onClick={() => moveCursor(1, scope)} icon={ChevronRight} title="Nästa" {...buttonProps} />
        </div>
      ) : undefined}
    </div>
  );
};

export default CursorText;
