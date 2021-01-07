import useSWR, { responseInterface } from "swr";
import { ClientDish, useDishes } from "../structures/client/Dish";

/**
 * Use the emissions of a dish. Returns the number of kilograms of carbon dioxide equivalents
 * caused by the dish.
 *
 * @param dishId The ID of the dish.
 */
export const useDishEmissions = (dishId: string): responseInterface<number, unknown> => useSWR(`/dishes/${dishId}/emissions`, () => ClientDish.fetchEmissions(dishId));

export const useDish = (dishId: string): ClientDish => {
  const { data: dishes } = useDishes();

  return dishes?.find((dish) => dish.id === dishId);
};
