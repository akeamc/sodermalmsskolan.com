import { DateTime } from "luxon";

/**
 * Get the number of seconds since midnight for a particular date.
 *
 * @param {DateTime} date Input date.
 *
 * @returns {number} The number of seconds.
 */
const secondsSinceMidnight = (date: DateTime): number => date.hour * 3600
 + date.minute * 60
 + date.second;

export default secondsSinceMidnight;
