import { SinglePeriod } from "./SinglePeriod";

export abstract class Period {
  public abstract Component: React.FunctionComponent;

  public abstract bounds: [number, number];

  /**
   * The duration of this period in five minute blocks.
   */
  public abstract duration: number;

  public abstract summary: string;

  public abstract groups: string[] | null;

  public abstract groupCategory?: string;

  public abstract getPeriodByGroup(group: string): SinglePeriod;
}

export * from "./PeriodGroup";
export * from "./SinglePeriod";
