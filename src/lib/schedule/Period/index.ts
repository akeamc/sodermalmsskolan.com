export abstract class Period {
  public abstract Component: React.FunctionComponent<{
    filterGroups?: string[];
  }>;

  public abstract bounds: [number, number];

  /**
   * The duration of this period in five minute blocks.
   */
  public abstract duration: number;

  public abstract summary: string;

  public abstract groups: string[] | null;

  public abstract groupGroup?: string;
}

export * from "./PeriodGroup";
export * from "./SinglePeriod";
