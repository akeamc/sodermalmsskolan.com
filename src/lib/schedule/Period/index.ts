export abstract class Period {
  public abstract Component: React.FunctionComponent<{
    group?: string;
  }>;

  public abstract bounds: [number, number];

  /**
   * The duration of this period in five minute blocks.
   */
  public abstract duration: number;

  public abstract summary: (group?: string) => string;

  public abstract groups: string[] | null;

  public abstract groupCategory?: string;
}

export * from "./PeriodGroup";
export * from "./SinglePeriod";
