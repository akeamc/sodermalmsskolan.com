import { DateTime } from "luxon";
import { DishStatic, Dish } from "./Dish";

export interface IMenu {
  dishes: DishStatic[];
  date: string;
}

export class Menu {
  dishes: Dish[];

  date: DateTime;

  constructor({ dishes, date }: IMenu) {
    this.dishes = dishes.map((dish) => new Dish(dish));
    this.date = DateTime.fromISO(date);
  }

  public serialize(): IMenu {
    return {
      dishes: this.dishes.map((dish) => dish.serialize()),
      date: this.date.toISO(),
    };
  }

  public get id(): string {
    return this.date.toISO();
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
