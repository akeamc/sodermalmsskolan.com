/**
 * Convert an amount of seconds to a human readable duration like `15:45` or `07:02`.
 *
 * @param {number} totalSeconds The total number of seconds.
 * @param {number} padHour Whether to pad the hour digit with zeroes (`04:30` vs `4:30`).
 *
 * @returns {string} The human readable time.
 */
export const getHumanReadableDuration = (totalSeconds: number, padHour = false): string => {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const hour = Math.floor(totalMinutes / 60).toString();
  const minute = (totalMinutes % 60).toString().padStart(2, "0");

  return [padHour ? hour.padStart(2, "0") : hour, minute].join(":");
};

/**
 * Parse a human-readable timestamp, such as `12:05:37` or `16:23` to seconds.
 *
 * @param {string} humanTime The input duration, separated by `:`.
 * @param {string} [separator=":"] The string separating the digits (default: ":").
 *
 * @returns {number} The duration, in seconds.
 */
export const parseHumanReadableDuration = (humanTime: string, separator = ":"): number => {
  const segments = humanTime.split(separator);

  return segments.reduce((sum, digit, index) => {
    const number = parseInt(digit, 10);
    const exponent = 2 - index;

    return sum + number * 60 ** exponent;
  }, 0);
};
