import RRule from "rrule";
import { DateTime } from "luxon";

export interface CalendarEvent {
  /**
   * The duration of the event, in seconds.
   */
  duration: number;
  title: string;
  shortTitle?: string;
  description?: string;
  color?: string;
  location?: string;
  canceled?: boolean;
  tag?: string;

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

export const getEventId = (calendarEvent: CalendarEvent, startKey: string): string => {
  const {
    duration,
    title,
    shortTitle = "",
    description = "",
    color = "",
    location = "",
    canceled = false,
    tag = "",
  } = calendarEvent;

  return [
    startKey,
    duration.toString(),
    title,
    shortTitle,
    description,
    color,
    location,
    canceled ? "1" : "0",
    tag,
  ].join(".");
};

export const getScheduledId = ({
  rrule,
  ...rest
}: ScheduledCalendarEvent): string => {
  const startKey = rrule.toString();

  return getEventId(rest, startKey);
};

export const getInstanceId = ({
  start,
  ...rest
}: CalendarEventInstance): string => {
  const startKey = start.getTime().toString();

  return getEventId(rest, startKey);
};

export const getScheduledArrayId = (scheduledEvents: ScheduledCalendarEvent[]): string => {
  if (!scheduledEvents) {
    return null;
  }

  const keys = scheduledEvents.map(getScheduledId);

  return keys.join(",");
};

export const getInstanceArrayId = (eventInstances: CalendarEventInstance[]): string => {
  if (!eventInstances) {
    return null;
  }

  const keys = eventInstances.map(getInstanceId);

  return keys.join(",");
};

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
