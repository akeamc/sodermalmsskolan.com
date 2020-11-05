export interface RatingStatic {
  author: string;
  dish: string;
  timestamp: string;
  rating: number;
}

export class Rating {
  author: string;
  dish: string;
  timestamp: Date;
  rating: number;

  constructor({ author, dish, timestamp, rating }: RatingStatic) {
    this.author = author;
    this.dish = dish;
    this.timestamp = new Date(timestamp);
    this.rating = rating;
  }

  public serialize(): RatingStatic {
    return {
      author: this.author,
      dish: this.dish,
      timestamp: this.timestamp.toISOString(),
      rating: this.rating,
    };
  }
}
