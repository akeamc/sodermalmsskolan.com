import { Period } from "./Period";
import { group } from "console";

export class Day extends Array<Period> {
  /**
   * Get the next period of a specific day.
   * @param time The number of minutes since midnight divided by `5`.
   */
  public nextPeriod(time: number): Period | null {
    return this.reduce((closest, current) => {
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
}
