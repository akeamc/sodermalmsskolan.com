import { RestClient } from "typed-rest-client";
import { IRestResponse } from "typed-rest-client";
import { MessagesResponse } from "./api";
import { Message } from "../models/Discord";

export class FanartClient {
  private client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }

  async getFanart(): Promise<Message[]> {
    const res: IRestResponse<MessagesResponse> = await this.client.get("/fanart");

    return res.result?.messages || [];
  }
}
