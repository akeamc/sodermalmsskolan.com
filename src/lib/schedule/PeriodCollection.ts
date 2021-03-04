import Period from "./Period";

/**
 * A collection of 'Period's.
 */
export default class PeriodCollection {
  fullName: string;

  shortName: string;

  private innerPeriods: Period[];

  constructor(fullName: string, shortName: string, periods: Period[]) {
    this.fullName = fullName;
    this.shortName = shortName;
    this.innerPeriods = periods;
  }

  public get periods(): Period[] {
    return this.innerPeriods.map((period) => {
      const clone = period;

      clone.collection = this.shortName;

      return clone;
    });
  }

  public get id(): string {
    return this.shortName;
  }
}
