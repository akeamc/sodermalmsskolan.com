import { Period } from "./Period";
import { GroupFilter } from "./Filter";
import { SinglePeriod } from "./Period/SinglePeriod";
import { Schedule } from "./Schedule";

export class PeriodCollection<T extends Period = Period> extends Array<T> {
  public filterByGroups(
    groupFilter: GroupFilter,
  ): PeriodCollection<SinglePeriod> {
    return new PeriodCollection(
      ...this.map((period) => period.getPeriodByGroup(groupFilter[period.groupCategory])),
    );
  }

  /**
   * Sort the periods by how soon they will be held based on `from`.
   * @param from
   */
  public upcoming(from: Date = new Date()): PeriodCollection<Period> {
    const weekTime = Schedule.dateToWeektime(from);

    // Find the index of the current time.
    const pivot = Math.max(
      this.findIndex((period) => period.start.weekTime >= weekTime),
      0,
    );

    return new PeriodCollection(
      ...this.slice(pivot).concat(this.slice(0, pivot)),
    );
  }

  /**
   * Get the next period after a specific timestamp.
   * @param timestamp
   */
  public next(timestamp: Date = new Date()): Period {
    return this.upcoming(timestamp)[0];
  }
}
