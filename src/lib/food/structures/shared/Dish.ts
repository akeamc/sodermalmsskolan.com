import { Serializable } from "../../../common/Serializable";

export interface IDish {
  title: string;
  id: string;
  co2e?: number;
}

export class Dish implements Serializable<IDish> {
  title: string;
  id: string;
  co2e?: number;

  constructor({ title, id, co2e }: IDish) {
    this.title = title;
    this.id = id;
    this.co2e = co2e;
  }

  public serialize(): IDish {
    return {
      title: this.title,
      id: this.id,
      co2e: this.co2e,
    };
  }
}
