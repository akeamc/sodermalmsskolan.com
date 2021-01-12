export type CalendarEventCharacteristics = string[];

export interface CalendarEventData {
  duration: number;
  title: string;
  shortTitle?: string;
  description?: string;
  color?: string;
  location?: string;
  canceled?: boolean;
  tag?: string;
  placeholder?: boolean;
  deltaStart?: number;
  deltaDuration?: number;
}

/**
 * An event, used to specify either a scheduled event *or* a series of event, scheduled at different
 * times but with matching data.
 */
export default class CalendarEvent implements CalendarEventData {
  /**
   * The duration of the event, in seconds.
   */
  public duration: number;

  public title: string;

  public shortTitle?: string;

  public description?: string;

  public color?: string;

  public location?: string;

  public canceled?: boolean;

  public tag?: string;

  /**
   * Whether the event is a placeholder or not. Should only be used client-side.
   */
  public placeholder?: boolean;

  private internalDeltaStart?: number;

  public get deltaStart(): number {
    if (typeof this.internalDeltaStart === "number") {
      return this.internalDeltaStart;
    }

    return 0;
  }

  public set deltaStart(newValue: number) {
    this.internalDeltaStart = newValue;
  }

  private internalDeltaDuration?: number;

  public get deltaDuration(): number {
    if (typeof this.internalDeltaDuration === "number") {
      return this.internalDeltaDuration;
    }

    return 0;
  }

  public set deltaDuration(newValue: number) {
    this.internalDeltaDuration = newValue;
  }

  /**
   * Initialize a new `CalendarEvent`.
   *
   * @param {CalendarEventData} data The inner data.
   */
  constructor(data: CalendarEventData) {
    Object.assign(this, data);
  }

  /**
   * Get the characteristics of this event, sort of like a checksum.
   *
   * @returns {CalendarEventCharacteristics} The characteristics.
   */
  public get characteristics(): CalendarEventCharacteristics {
    const {
      duration,
      title,
      shortTitle = "",
      description = "",
      color = "",
      location = "",
      canceled = false,
      tag = "",
    } = this;

    return [
      duration.toString(),
      title,
      shortTitle,
      description,
      color,
      location,
      canceled ? "1" : "0",
      tag,
    ];
  }

  /**
   * Get the signature of the event, i.e. the characteristics serialized.
   *
   * @returns {string} The serialized characteristics.
   */
  public get signature(): string {
    return this.characteristics.join(".");
  }
}
