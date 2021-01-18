export type GTagCommand = "config" | "get" | "set" | "event";

/**
 * The `gtag` function.
 *
 * @param {GTagCommand} command Command to run.
 * @param {any} args Arguments.
 *
 * @returns {any} Anything!
 */

/**
 * Slightly less bad version of the `gtag` function.
 *
 * @param {GTagCommand} command Command.
 * @param {any} args Arguments.
 *
 * @returns {*} Unknown!
 */
const gtag = (command: GTagCommand, ...args: unknown[]): unknown => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag(command, ...args)
);

export default gtag;
