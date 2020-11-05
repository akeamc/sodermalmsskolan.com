import { Serializable } from "../../../common/Serializable";
import { Rating, RatingStatic } from "./Rating";

export interface IDish {
  title: string;
  id: string;
  co2e?: number;
  ratings?: RatingStatic[];
}

export class Dish implements Serializable<IDish> {
  title: string;
  id: string;
  co2e?: number;
  ratings?: Rating[];

  constructor({ title, id, co2e, ratings }: IDish) {
    this.title = title;
    this.id = id;
    this.co2e = co2e;
    this.ratings = ratings?.map((rating) => new Rating(rating));
  }

  public serialize(): IDish {
    return {
      title: this.title,
      id: this.id,
      co2e: this.co2e,
      ratings: this.ratings.map((rating) => rating.serialize()),
    };
  }

  public get averageRating(): number | null {
    if (this.ratings?.length > 0) {
      return (
        this.ratings?.reduce(
          (accumulator, { rating }) => accumulator + rating,
          0
        ) / this.ratings?.length
      );
    }

    return null;
  }
}
