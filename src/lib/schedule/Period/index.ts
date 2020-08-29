export abstract class Period {
  public abstract Component: React.FunctionComponent;

  public abstract bounds: [number, number];

  /**
   * The duration of this period in five minute blocks.
   */
  public abstract duration: number;

  public abstract summary: string;
}

export * from "./GroupPeriod";
export * from "./SinglePeriod";
