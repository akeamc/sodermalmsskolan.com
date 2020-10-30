import { SinglePeriod } from "./SinglePeriod";
import { Schedule } from "../Schedule";
import dayjs, { Dayjs } from "dayjs";

export class PeriodBoundary {
  private day: number;
  private time: number;

  constructor(day: number, time: number) {
    this.day = day;
    this.time = time;
  }

  /**
   * Equal to the number of minutes since midnight divided by five.
   */
  public get scheduleTime(): number {
    return this.time;
  }

  /**
   * Equal to the number of minutes since **monday midnight** divided by five.
   */
  public get weekTime(): number {
    return Schedule.scheduleTimeToWeekTime(this.day, this.time);
  }

  public get isoWeekday(): number {
    return this.day + 1;
  }

  public get hour(): number {
    return Math.floor(this.time / 12);
  }

  public get minute(): number {
    return Math.floor(this.time % 12) * 5;
  }

  public get human(): [number, number] {
    return [this.hour, this.minute];
  }

  public format(delimteter = ":"): string {
    return this.human
      .map((digits) => digits.toString().padStart(2, "0"))
      .join(delimteter);
  }

  /**
   * Get the next absolute timestamp when this period will occur from a timestamp.
   * @param timestamp
   */
  public nextAbsolute(timestamp: Date = new Date()): Dayjs {
    const absoluteTimestamp = dayjs(timestamp)
      .set("hour", this.hour)
      .set("minute", this.minute)
      .set("second", 0)
      .set("millisecond", 0);

    if (absoluteTimestamp.day() <= this.isoWeekday) {
      return absoluteTimestamp.day(this.isoWeekday);
    } else {
      return absoluteTimestamp.add(1, "week").day(this.isoWeekday);
    }
  }
}

export abstract class Period {
  public abstract Component: React.FunctionComponent;

  public abstract start: PeriodBoundary;
  public abstract end: PeriodBoundary;

  public abstract bounds: [number, number];

  /**
   * The duration of this period in five minute blocks.
   */
  public abstract duration: number;

  public abstract summary: string;

  public abstract groups: string[] | null;

  public abstract groupCategory?: string;

  public abstract getPeriodByGroup(group: string): SinglePeriod;

  /**
   * Weekday of the period, where Monday is `0` and Sunday is `6`.
   */
  public abstract day: number;
}

export * from "./PeriodGroup";
export * from "./SinglePeriod";
