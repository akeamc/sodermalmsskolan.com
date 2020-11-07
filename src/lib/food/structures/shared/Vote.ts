export interface VoteStatic {
  author: string;
  dish: string;
  timestamp: string;
  up: boolean;
}

export class Vote {
  author: string;
  dish: string;
  timestamp: Date;
  up: boolean;

  constructor({ author, dish, timestamp, up }: VoteStatic) {
    this.author = author;
    this.dish = dish;
    this.timestamp = new Date(timestamp);
    this.up = up;
  }

  public serialize(): VoteStatic {
    return {
      author: this.author,
      dish: this.dish,
      timestamp: this.timestamp.toISOString(),
      up: this.up,
    };
  }

  public get down(): boolean {
    return !this.up;
  }
}
