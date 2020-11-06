import { ResponsePromise } from "ky";
import ky from "ky-universal";
import { Vote } from "../shared/Vote";

export class ClientVote extends Vote {
  public static async sendVote(
    dish: string,
    positive: boolean
  ): Promise<ResponsePromise> {
    return ky.post(`/api/food/dishes/${dish}/votes`, {
      json: {
        positive,
      },
    });
  }

  public static async deleteVote(dish: string): Promise<ResponsePromise> {
    return ky.delete(`/api/food/dishes/${dish}/votes`);
  }
}
