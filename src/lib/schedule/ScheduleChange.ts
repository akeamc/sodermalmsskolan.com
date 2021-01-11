import { parseHumanReadableTime } from "../calendar/humanReadableTime";

export default interface ScheduleChange {
  periodId: string;
  canceled: boolean;
  note?: string;
}

/**
 * Parse a Discord `Message` to a `ScheduleChange`.
 *
 * @param {string} content The message content to be parsed.
 *
 * @returns {ScheduleChange} The schedule change.
 */
export const parseMessageContent = (content: string): ScheduleChange => {
  const segments = content.split(" ");

  const periodId = segments.shift();

  const timeChange = segments.shift();

  console.log(timeChange);

  // console.log(parseHumanReadableTime(segments.shift().split(":")[0]))

  return {
    periodId,
    note: "",
    canceled: true,
  };
};
