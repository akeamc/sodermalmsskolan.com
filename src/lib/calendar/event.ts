import RRule from "rrule";
import { DateTime } from "luxon";

export interface CalendarEvent {
  /**
   * The duration of the event, in seconds.
   */
  duration: number;
  title: string;
  description?: string;
  color?: string;
  location?: string;
  canceled?: boolean;

  /**
   * Whether the event is a placeholder or not. Should only be used client-side.
   */
  placeholder?: boolean;
}

export interface CalendarEventInstance extends CalendarEvent {
  start: Date;
}

export interface ScheduledCalendarEvent extends CalendarEvent {
  rrule: RRule;
}

export const getCalendarEventId = (calendarEvent: CalendarEventInstance): string => (
  [calendarEvent.start.getTime(), calendarEvent.duration.toString(), calendarEvent.title].join("-")
);

/**
 * Normalize a strange date. Makes it easier to handle.
 * @param input
 */
export const normalizeRRuleDate = (input: Date): Date => (
  DateTime.fromJSDate(input)
    .toUTC()
    .setZone("local", { keepLocalTime: true })
    .toJSDate()
);

/**
 * Convert an array of event schedules to scheduled events with concrete start times.
 *
 * @param scheduledEvents
 * @param after
 * @param before
 */
export const evaluateSchedule = (
  scheduledEvents: ScheduledCalendarEvent[],
  after: Date,
  before: Date,
): CalendarEventInstance[] => scheduledEvents
  .reduce((evaluated: CalendarEventInstance[], {
    rrule,
    ...shared
  }) => {
    const occurrences = rrule
      .between(after, before)
      .map(normalizeRRuleDate);

    occurrences.forEach((start) => {
      evaluated.push({
        ...shared,
        start,
      });
    });

    return evaluated;
  }, []);

export const humanReadableTime = (totalSeconds: number, padHour = false): string => {
  const totalMinutes = totalSeconds / 60;

  const hour = Math.floor(totalMinutes / 60).toString();
  const minute = (totalMinutes % 60).toString().padStart(2, "0");

  return [padHour ? hour.padStart(2, "0") : hour, minute].join(":");
};
