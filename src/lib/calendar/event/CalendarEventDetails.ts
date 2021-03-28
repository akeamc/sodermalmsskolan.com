export default interface CalendarEventDetails {
  /**
   * The title of the event.
   */
  summary: string;

  /**
   * Optional event description.
   */
  description?: string;

  /**
   * Color.
   */
  color: string;

  /**
   * Geographic location of the event as free-form text.
   */
  location?: string;

  /**
   * How long the calendar event lasts, in seconds.
   */
  duration: number;
}

/**
 * Get an array containing the values of the CalendarEventDetails.
 *
 * @param {CalendarEventDetails} details `CalendarEventDetails`.
 *
 * @returns {string[]} The characteristics.
 */
export const getEventDetailsCharacteristics = ({
  summary,
  description = "",
  color,
  location = "",
  duration,
}: CalendarEventDetails): string[] => [
  summary,
  description,
  color,
  location,
  duration.toString(),
];

/**
 * Serialize calendar event details into a nice string.
 *
 * @param {CalendarEventDetails} details Details.
 *
 * @returns {string} The calendar event details in a comparable string.
 */
export const getEventDetailsSignature = (details: CalendarEventDetails): string => (
  getEventDetailsCharacteristics(details).join(".")
);
