export type GTagCommand = "config" | "get" | "set" | "event" | "js";

/**
 * Slightly less bad version of the `gtag` function.
 *
 * @param {GTagCommand} command Command.
 * @param {any} args Arguments.
 */
const gtag = (command: GTagCommand, ...args: unknown[]): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag(command, ...args);
};

export default gtag;
