import { Subjects } from "./Subject";
import {
  SinglePeriod,
  PeriodGroup,
  Period,
  GroupedPeriod,
  practicalSubjects,
  randomTime,
  languages,
} from "./Period";
import { PeriodCollection } from "./PeriodCollection";

export class Schedule {
  public group: string;
  public periods: PeriodCollection;

  constructor(group: string, periods: Period[], base?: Schedule) {
    this.group = group;
    this.periods = new PeriodCollection(
      ...periods
        .concat(base?.periods || [])
        .sort((a, b) => a.start.weekTime - b.start.weekTime)
    );
  }

  public get bounds(): [number, number] {
    return this.periods.reduce(
      ([minimum, maximum], period) => {
        const { bounds } = period;

        minimum = Math.min(minimum, bounds[0]);
        maximum = Math.max(maximum, bounds[1]);

        return [minimum, maximum];
      },
      [60 * 24, 0]
    );
  }

  public get days(): number {
    return this.periods[this.periods.length - 1].day + 1 - this.periods[0].day;
  }

  public get maximumDuration(): number {
    const [start, end] = this.bounds;

    return end - start;
  }

  public static dateToDayIndex(timestamp: Date = new Date()): number {
    return (timestamp.getDay() + 6) % 7;
  }

  public static dateToScheduleTime(timestamp: Date = new Date()): number {
    return (
      (timestamp.getHours() * 60 +
        timestamp.getMinutes() +
        timestamp.getSeconds() / 60) /
      5
    );
  }

  /**
   * Convert a timestamp to week time, i.e. the number of minutes since Monday midnight divided by five.
   * @param day
   * @param time
   */
  public static scheduleTimeToWeekTime(day: number, time: number): number {
    return day * ((60 * 24) / 5) + time;
  }

  public static dateToWeektime(timestamp: Date = new Date()): number {
    const day = Schedule.dateToDayIndex(timestamp);
    const time = Schedule.dateToScheduleTime(timestamp);

    return Schedule.scheduleTimeToWeekTime(day, time);
  }

  public get selectableGroups(): Map<string, string[]> {
    return this.periods.reduce((groupGroups, period) => {
      if (period.groupCategory) {
        groupGroups.set(period.groupCategory, period.groups);
      }

      return groupGroups;
    }, new Map<string, string[]>());
  }
}

export const CommonSchedule = new Schedule("Ovalen", [
  new PeriodGroup(
    [
      new GroupedPeriod([137, 149], 1, Subjects.Swedish, "Tidelius", "Drama"),
      new GroupedPeriod([137, 149], 1, Subjects.English, "A307", "EV LWA"),
      new GroupedPeriod([137, 149], 1, Subjects.English, "A309", "EV SDO"),
      new GroupedPeriod([137, 149], 1, Subjects.Mathematics, "A112", "EV MA"),
    ],
    "Elevens val"
  ),
  languages([173, 188], 1),
  practicalSubjects(2, {
    chemistry: [[116, 132], "O9IER"],
    hardCrafts: [[116, 132], "O9JZH"],
    softCrafts: [[116, 132], "O9LWA"],
    music: [[114, 131], "O9DKA"],
    gastronomy: [[116, 133], "O9MBE"],
  }),
  languages([173, 188], 2),
  practicalSubjects(3, {
    chemistry: [[98, 114], "O9DKA"],
    hardCrafts: [[98, 114], "O9IER"],
    softCrafts: [[98, 114], "O9JZH"],
    music: [[98, 115], "O9MBE"],
    gastronomy: [[98, 116], "O9LWA"],
  }),
  practicalSubjects(3, {
    chemistry: [[120, 136], "O9MBE"],
    hardCrafts: [[120, 136], "O9DKA"],
    softCrafts: [[120, 136], "O9IER"],
    music: [[118, 136], "O9LWA"],
    gastronomy: [[118, 136], "O9JZH"],
  }),
  new SinglePeriod([172, 192], 3, Subjects.Sports, "Forsgrenska"),
  randomTime([114, 124], 4),
  practicalSubjects(4, {
    chemistry: [[128, 144], "O9LWA"],
    hardCrafts: [[131, 147], "O9MBE"],
    softCrafts: [[131, 147], "O9DKA"],
    music: [[128, 145], "O9JZH"],
    gastronomy: [[128, 146], "O9IER"],
  }),
  practicalSubjects(4, {
    chemistry: [[156, 172], "O9JZH"],
    hardCrafts: [[156, 172], "O9LWA"],
    softCrafts: [[156, 172], "O9MBE"],
    music: [[156, 173], "O9IER"],
    gastronomy: [[156, 174], "O9DKA"],
  }),
]);

export const Schedules: Schedule[] = [
  new Schedule(
    "O91",
    [
      new SinglePeriod([101, 115], 0, Subjects.Mathematics, "A307"),
      new SinglePeriod([117, 132], 0, Subjects.SocialStudies, "A309"),
      new SinglePeriod([135, 149], 0, Subjects.Swedish, "A308"),
      new SinglePeriod([159, 170], 0, Subjects.Chemistry, "A415"),
      new SinglePeriod([108, 118], 1, Subjects.Sports, "B501"),
      new SinglePeriod([123, 135], 1, Subjects.English, "A307"),
      new SinglePeriod([158, 171], 1, Subjects.SocialStudies, "A309"),
      new SinglePeriod([99, 112], 2, Subjects.Mathematics, "A307"),
      new SinglePeriod([136, 149], 2, Subjects.Swedish, "A308"),
      new SinglePeriod([159, 169], 2, Subjects.SocialStudies, "A309"),
      new SinglePeriod([138, 148], 3, Subjects.Chemistry, "A415"),
      new SinglePeriod([157, 167], 3, Subjects.English, "A307"),
      new SinglePeriod([177, 189], 4, Subjects.Mathematics, "A307"),
    ],
    CommonSchedule
  ),
  new Schedule(
    "O92",
    [
      new SinglePeriod([102, 113], 0, Subjects.Chemistry, "A415"),
      new SinglePeriod([115, 127], 0, Subjects.English, "A307"),
      new SinglePeriod([133, 149], 0, Subjects.Mathematics, "A307"),
      new SinglePeriod([159, 174], 0, Subjects.SocialStudies, "A309"),
      new SinglePeriod([98, 108], 1, Subjects.Sports, "B501"),
      new SinglePeriod([121, 134], 1, Subjects.SocialStudies, "A309"),
      new SinglePeriod([158, 168], 1, Subjects.Chemistry, "A311"),
      new SinglePeriod([102, 112], 2, Subjects.English, "A307"),
      new SinglePeriod([136, 149], 2, Subjects.Mathematics, "A307"),
      new SinglePeriod([158, 172], 2, Subjects.Swedish, "A308"),
      new SinglePeriod([137, 150], 3, Subjects.Swedish, "A308"),
      new SinglePeriod([157, 167], 3, Subjects.Mathematics, "A308"),
      new SinglePeriod([176, 186], 4, Subjects.SocialStudies, "A309"),
    ],
    CommonSchedule
  ),
  new Schedule(
    "O93",
    [
      new SinglePeriod([101, 113], 0, Subjects.English, "A307"),
      new SinglePeriod([117, 132], 0, Subjects.Mathematics, "A307"),
      new SinglePeriod([134, 149], 0, Subjects.SocialStudies, "A309"),
      new SinglePeriod([159, 173], 0, Subjects.Swedish, "A308"),
      new SinglePeriod([101, 114], 1, Subjects.Mathematics, "A307"),
      new SinglePeriod([118, 128], 1, Subjects.Sports, "B501"),
      new SinglePeriod([158, 171], 1, Subjects.Swedish, "A308"),
      new SinglePeriod([100, 111], 2, Subjects.Chemistry, "A311"),
      new SinglePeriod([136, 149], 2, Subjects.SocialStudies, "A309"),
      new SinglePeriod([159, 169], 2, Subjects.English, "A307"),
      new SinglePeriod([138, 149], 3, Subjects.Mathematics, "A307"),
      new SinglePeriod([157, 167], 3, Subjects.SocialStudies, "A309"),
      new SinglePeriod([176, 186], 4, Subjects.Chemistry, "A311"),
    ],
    CommonSchedule
  ),
];
