/**
 * Get the number of seconds since midnight for a particular date.
 *
 * @param {Date} date Input date.
 *
 * @returns {number} The number of seconds.
 */
const secondsSinceMidnight = (date: Date): number => date.getHours() * 3600
 + date.getMinutes() * 60
 + date.getSeconds();

export default secondsSinceMidnight;
