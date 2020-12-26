import Period from "./period";

export default class PeriodCollection {
  name: string;

  private innerPeriods: Period[];

  constructor(name: string, periods: Period[]) {
    this.name = name;
    this.innerPeriods = periods;
  }

  public get periods(): Period[] {
    return this.innerPeriods.map((period) => {
      const clone = period;

      clone.collection = this.name;

      return clone;
    });
  }
}
