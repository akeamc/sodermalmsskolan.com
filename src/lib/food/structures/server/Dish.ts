import got, { HTTPError } from "got";
import { API_ENDPOINT } from "../../constants";
import { Dish, IDish } from "../shared/Dish";
import admin from "../../../firebase/admin";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type ServerDishHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  dish: ServerDish
) => void | Promise<void>;

export class ServerDish extends Dish {
  public static firestoreCollection(): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    const db = admin.firestore();

    return db.collection("dishes");
  }

  public static firestoreDocument(
    id: string
  ): FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> {
    return ServerDish.firestoreCollection().doc(id);
  }

  public static async fetchAll(): Promise<ServerDish[]> {
    const res = await got.get(`${API_ENDPOINT}/dishes`).json<IDish[]>();

    return res.map((dish) => new ServerDish(dish));
  }

  /**
   * Returns detailed information about a `Dish` with a specified `id` such as carbon dioxide equivalent emissions.
   * @param id
   */
  public static async fetch(id: string): Promise<ServerDish> {
    const res = await got.get(`${API_ENDPOINT}/dishes/${id}`).json<IDish>();

    return new ServerDish({
      ...res,
    });
  }

  public static wrapHandler = (handler: ServerDishHandler): NextApiHandler => {
    return async (req, res) => {
      const id = req.query.dish?.toString();

      let dish: ServerDish;

      try {
        dish = await ServerDish.fetch(id);
      } catch (error) {
        if (error instanceof HTTPError) {
          return res.status(404).send("dish not found");
        } else {
          throw error;
        }
      }

      return await handler(req, res, dish);
    };
  };
}
