import Serializable from "../../../common/serializable";

export interface DishStatic {
  title: string;
  id: string;
  co2e?: number;
  images?: string[];
}

export class Dish implements Serializable<DishStatic> {
  title: string;

  id: string;

  co2e?: number;

  constructor({ title, id, co2e }: DishStatic) {
    this.title = title;
    this.id = id;
    this.co2e = co2e;
  }

  public serialize(): DishStatic {
    return {
      title: this.title,
      id: this.id,
      co2e: this.co2e,
    };
  }
}
