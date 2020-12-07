import { IDish, Dish } from "./Dish";

export interface IMenu {
  dishes: IDish[];
  date: string;
}

export class Menu {
  dishes: Dish[];

  date: Date;

  constructor({ dishes, date }: IMenu) {
    this.dishes = dishes.map((dish) => new Dish(dish));
    this.date = new Date(date);
  }

  public serialize(): IMenu {
    return {
      dishes: this.dishes.map((dish) => dish.serialize()),
      date: this.date.toISOString(),
    };
  }

  public get id(): string {
    return this.date.getTime().toString();
  }
}

export interface MenuQuery {
  /**
   * How many menus to retreive (maximum).
   */
  limit?: number;

  /**
   * Offset the starting day, counting from today.
   */
  offset?: number;
}
