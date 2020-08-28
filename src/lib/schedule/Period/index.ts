export abstract class Period {
  public abstract Component: React.FunctionComponent;

  public abstract bounds: [number, number];

  public abstract duration: number;
}

export * from "./GroupPeriod";
export * from "./SinglePeriod";
