export interface VoteStatic {
  author: string;
  dish: string;
  timestamp: string;
  positive: boolean;
}

export class Vote {
  author: string;
  dish: string;
  timestamp: Date;
  positive: boolean;

  constructor({ author, dish, timestamp, positive }: VoteStatic) {
    this.author = author;
    this.dish = dish;
    this.timestamp = new Date(timestamp);
    this.positive = positive;
  }

  public serialize(): VoteStatic {
    return {
      author: this.author,
      dish: this.dish,
      timestamp: this.timestamp.toISOString(),
      positive: this.positive,
    };
  }

  public get value(): number {
    return this.positive ? 1 : -1;
  }
}
