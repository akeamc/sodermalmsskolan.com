import { Subjects } from "./Subject";
import {
  SinglePeriod,
  PeriodGroup,
  Period,
  GroupedPeriod,
  practicalSubjects,
} from "./Period";
import { Day } from "./Day";

export class Schedule {
  public group: string;
  public days: Day[];

  constructor(group: string, days: Day[], base?: Schedule) {
    this.group = group;
    this.days = days.map((day, index) => {
      return new Day(...day, ...(base?.days[index] || []));
    });
  }

  public get bounds(): [number, number] {
    return this.days.reduce(
      ([minimum, maximum], day) => {
        for (const period of day) {
          const { bounds } = period;

          minimum = Math.min(minimum, bounds[0]);
          maximum = Math.max(maximum, bounds[1]);
        }

        return [minimum, maximum];
      },
      [60 * 24, 0]
    );
  }

  public get maximumDuration(): number {
    const [start, end] = this.bounds;

    return end - start;
  }

  private dayIndex(timestamp: Date = new Date()): number {
    return (timestamp.getDay() + 6) % 7;
  }

  public nextDays(timestamp: Date = new Date()): Day[] {
    const index = this.dayIndex(timestamp);

    return this.days.slice(index).concat(this.days.slice(0, index));
  }

  public nextPeriod(timestamp: Date = new Date()): Period | null {
    const followingDays = this.nextDays(timestamp);
    const index = this.dayIndex(timestamp);

    const time = this.days[index]
      ? (timestamp.getHours() * 60 + timestamp.getMinutes()) / 5
      : 0;

    return followingDays[0].nextPeriod(time);
  }
}

const CommonSchedule = new Schedule("Ovalen", [
  new Day(),
  new Day(
    new PeriodGroup([
      new GroupedPeriod([137, 149], Subjects.Swedish, "Tidelius", "EV drama"),
      new GroupedPeriod([137, 149], Subjects.English, "A307", "EV engelska"),
      new GroupedPeriod([137, 149], Subjects.English, "A309", "EV engelska"),
      new GroupedPeriod(
        [137, 149],
        Subjects.Mathematics,
        "A112",
        "EV matematik"
      ),
    ]),
    new PeriodGroup([
      new GroupedPeriod([173, 188], Subjects.Swedish, "A308", "ASVEN"),
      new GroupedPeriod([173, 188], Subjects.French, "A221", "M2FR"),
      new GroupedPeriod([173, 188], Subjects.Spanish, "A110", "M2SP"),
      new GroupedPeriod([173, 188], Subjects.Spanish, "A220", "M2SP"),
      new GroupedPeriod([173, 188], Subjects.German, "A310", "M2TY"),
    ])
  ),
  new Day(
    practicalSubjects({
      chemistry: [[116, 132], "O9IER"],
      hardCrafts: [[116, 132], "O9JZH"],
      softCrafts: [[116, 132], "O9LWA"],
      music: [[114, 131], "O9DKA"],
      gastronomy: [[114, 134], "O9MBE"],
    }),
    new PeriodGroup([
      new GroupedPeriod([173, 188], Subjects.Swedish, "A308", "ASVEN"),
      new GroupedPeriod([173, 188], Subjects.French, "A221", "M2FR"),
      new GroupedPeriod([173, 188], Subjects.Spanish, "A110", "M2SP"),
      new GroupedPeriod([173, 188], Subjects.Spanish, "A220", "M2SP"),
      new GroupedPeriod([173, 188], Subjects.German, "A309", "M2TY"),
    ])
  ),
  new Day(
    practicalSubjects({
      chemistry: [[98, 114], "O9DKA"],
      hardCrafts: [[98, 114], "O9IER"],
      softCrafts: [[98, 114], "O9JZH"],
      music: [[98, 115], "O9MBE"],
      gastronomy: [[98, 116], "O9LWA"],
    }),
    practicalSubjects({
      chemistry: [[120, 136], "O9MBE"],
      hardCrafts: [[120, 136], "O9DKA"],
      softCrafts: [[120, 136], "O9IER"],
      music: [[118, 136], "O9LWA"],
      gastronomy: [[119, 136], "O9JZH"],
    }),
    new SinglePeriod([172, 192], Subjects.Sports, "Forsgrenska")
  ),
  new Day(
    new PeriodGroup([
      new GroupedPeriod([114, 124], Subjects.Random, "A309", "O9DKA"),
      new GroupedPeriod([114, 124], Subjects.Random, "A402", "O9IER"),
      new GroupedPeriod([114, 124], Subjects.Random, "A415", "O9JZH"),
      new GroupedPeriod([114, 124], Subjects.Random, "A307", "O9LWA"),
      new GroupedPeriod([114, 124], Subjects.Random, "A308", "O9MBE"),
    ]),
    practicalSubjects({
      chemistry: [[128, 144], "O9LWA"],
      hardCrafts: [[131, 147], "O9MBE"],
      softCrafts: [[131, 147], "O9DKA"],
      music: [[128, 145], "O9JZH"],
      gastronomy: [[128, 146], "O9IER"],
    }),
    practicalSubjects({
      chemistry: [[156, 172], "O9JZH"],
      hardCrafts: [[156, 172], "O9LWA"],
      softCrafts: [[156, 172], "O9MBE"],
      music: [[156, 173], "O9IER"],
      gastronomy: [[156, 174], "O9DKA"],
    })
  ),
]);

export const Schedules: Schedule[] = [
  new Schedule(
    "O91",
    [
      new Day(
        new SinglePeriod([101, 115], Subjects.Mathematics, "A307"),
        new SinglePeriod([117, 132], Subjects.SocialStudies, "A309"),
        new SinglePeriod([135, 149], Subjects.Swedish, "A308"),
        new SinglePeriod([159, 170], Subjects.Physics, "A415")
      ),
      new Day(
        new SinglePeriod([108, 118], Subjects.Sports, "B501"),
        new SinglePeriod([123, 135], Subjects.English, "A307"),
        new SinglePeriod([158, 171], Subjects.SocialStudies, "A309")
      ),
      new Day(
        new SinglePeriod([99, 112], Subjects.Mathematics, "A307"),
        new SinglePeriod([136, 149], Subjects.Swedish, "A308"),
        new SinglePeriod([159, 169], Subjects.SocialStudies, "A309")
      ),
      new Day(
        new SinglePeriod([138, 148], Subjects.Physics, "A415"),
        new SinglePeriod([157, 167], Subjects.English, "A307")
      ),
      new Day(new SinglePeriod([177, 189], Subjects.Mathematics, "A307")),
    ],
    CommonSchedule
  ),
  new Schedule(
    "O92",
    [
      new Day(
        new SinglePeriod([102, 113], Subjects.Physics, "A415"),
        new SinglePeriod([115, 127], Subjects.English, "A307"),
        new SinglePeriod([133, 149], Subjects.Mathematics, "A307"),
        new SinglePeriod([159, 174], Subjects.SocialStudies, "A309")
      ),
      new Day(
        new SinglePeriod([98, 108], Subjects.Sports, "B501"),
        new SinglePeriod([121, 134], Subjects.SocialStudies, "A309"),
        new SinglePeriod([158, 168], Subjects.Physics, "A311")
      ),
      new Day(
        new SinglePeriod([102, 112], Subjects.English, "A307"),
        new SinglePeriod([136, 149], Subjects.Mathematics, "A307"),
        new SinglePeriod([158, 172], Subjects.Swedish, "A308")
      ),
      new Day(
        new SinglePeriod([137, 150], Subjects.Swedish, "A308"),
        new SinglePeriod([157, 167], Subjects.Mathematics, "A308")
      ),
      new Day(new SinglePeriod([176, 186], Subjects.SocialStudies, "A309")),
    ],
    CommonSchedule
  ),
  new Schedule(
    "O93",
    [
      new Day(
        new SinglePeriod([101, 113], Subjects.English, "A307"),
        new SinglePeriod([117, 132], Subjects.Mathematics, "A307"),
        new SinglePeriod([134, 149], Subjects.SocialStudies, "A309"),
        new SinglePeriod([159, 173], Subjects.Swedish, "A308")
      ),
      new Day(
        new SinglePeriod([101, 114], Subjects.Mathematics, "A307"),
        new SinglePeriod([118, 128], Subjects.Sports, "B501"),
        new SinglePeriod([158, 171], Subjects.Swedish, "A308")
      ),
      new Day(
        new SinglePeriod([100, 111], Subjects.Physics, "A311"),
        new SinglePeriod([136, 149], Subjects.SocialStudies, "A309"),
        new SinglePeriod([159, 169], Subjects.English, "A307")
      ),
      new Day(
        new SinglePeriod([138, 149], Subjects.Mathematics, "A307"),
        new SinglePeriod([157, 167], Subjects.SocialStudies, "A309")
      ),
      new Day(new SinglePeriod([179, 189], Subjects.Physics, "A311")),
    ],
    CommonSchedule
  ),
];
