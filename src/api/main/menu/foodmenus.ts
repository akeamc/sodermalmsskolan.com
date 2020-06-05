import client from "../client";
import { CollectionResponse } from "../Response";

export interface FoodMenu {
  dishes: string[];
  timestamp: Date;
}

interface FoodMenuResponse extends CollectionResponse {
  menus: FoodMenu[];
}

export async function getNext(limit = 10, offset = 0): Promise<FoodMenu[]> {
  try {
    const res = await client.get<FoodMenuResponse>("/menu/next");

    return res.result.menus;
  }
  catch(error) {
    console.error(error);
    return [];
  }
}