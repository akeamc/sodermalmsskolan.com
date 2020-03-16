import { RestClient } from "typed-rest-client";
import { User } from "../models/User";
import { IRestResponse } from "typed-rest-client";
import { BaseResponse } from "./api";

export interface Image {
  url: string;
}

export interface Artwork {
  timestamp: Date;
  author: User;
  title: string;
  image: Image;
}

export interface FanartResponse extends BaseResponse {
  artworks: Artwork[];
}

export class FanartClient {
  private client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }

  async getFanart(): Promise<Artwork[]> {
    const res: IRestResponse<FanartResponse> = await this.client.get("/fanart");

    return res.result.artworks;
  }
}
