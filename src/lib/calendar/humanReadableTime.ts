const humanReadableTime = (totalSeconds: number, padHour = false): string => {
  const totalMinutes = totalSeconds / 60;

  const hour = Math.floor(totalMinutes / 60).toString();
  const minute = (totalMinutes % 60).toString().padStart(2, "0");

  return [padHour ? hour.padStart(2, "0") : hour, minute].join(":");
};

export default humanReadableTime;

/**
 * Parse a human-readable timestamp, such as `12:05:37` or `16:23` to seconds.
 *
 * @param {string} humanTime The input time, separated by `:`.
 *
 * @returns {number} The duration, in seconds.
 */
export const parseHumanReadableTime = (humanTime: string): number => {
  const segments = humanTime.split(":");

  return segments.reduce((sum, digit, index) => {
    const number = parseInt(digit, 10);
    const exponent = 2 - index;

    return sum + number * 60 ** exponent;
  }, 0);
};
