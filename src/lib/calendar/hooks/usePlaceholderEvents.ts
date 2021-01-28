import { Dayjs } from "dayjs";
import { useMemo } from "react";
import seedrandom from "seedrandom";
import map from "../../utils/map";
import CalendarEvent from "../event/CalendarEvent";
import CalendarEventInstance from "../event/CalendarEventInstance";

export type GetPlaceholderEventSeed = (index: number) => string;

/**
 * Generate placeholder events from a common seed, thus making it SSR-safe.
 *
 * @param {Dayjs} after The start date.
 * @param {Dayjs} before The end date.
 * @param {number} count The number of events to generate **per day**.
 * @param {GetPlaceholderEventSeed} seed Function to get the seed of the day based on its index.
 *
 * @returns {CalendarEventInstance[]} The generated event instances.
 */
const usePlaceholderEvents = (
  after: Dayjs,
  before: Dayjs,
  count = 3,
  seed: GetPlaceholderEventSeed = (index) => index.toString(),
): CalendarEventInstance[] => useMemo(() => {
  const days = before.diff(after, "day");

  return Array.from({
    length: days + 1,
  }).map((_, index) => {
    const rng = seedrandom(seed(index));

    return Array.from({
      length: count,
    }).map(() => {
      const minutes = Math.floor(map(rng.quick(), 0, 1, 9 * 60, 17 * 60) / 5) * 5;

      const start = after.add(index, "day").add(minutes, "minute");

      const duration = Math.floor(map(rng.quick(), 0, 1, 45, 100) / 5) * 5 * 60;

      return new CalendarEventInstance(start.toDate(), new CalendarEvent({
        title: null,
        duration,
        placeholder: true,
      }));
    });
  }).flat();
}, [after, before, count, seed]);

export default usePlaceholderEvents;
