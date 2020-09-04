import { Period, SinglePeriod } from "./Period";
import { GroupFilter } from "./Filter";

export class Day<T extends Period = Period> extends Array<T> {
  /**
   * Get the next period of a specific day.
   * @param time The number of minutes since midnight divided by `5`.
   */
  public nextPeriod(time: number, groups?: GroupFilter): Period | null {
    const periods: Day<Period> = groups ? this.filterPeriods(groups) : this;

    return periods.reduce((closest, current) => {
      const timeUntilCurrent = current.bounds[0] - time;
      const timeUntilClosest = closest?.bounds[0] - time;

      if (timeUntilCurrent >= 0) {
        if (timeUntilClosest > timeUntilCurrent || !closest) {
          return current;
        }
      }

      return closest;
    }, null);
  }

  public filterPeriods(groups: GroupFilter): Day<SinglePeriod> {
    return new Day(
      ...this.map((period) =>
        period.getPeriodByGroup(groups[period.groupCategory])
      )
    );
  }
}
