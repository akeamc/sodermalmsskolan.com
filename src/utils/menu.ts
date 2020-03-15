import { RestClient, IRestResponse } from "typed-rest-client";
import { BaseResponse } from "./api";
import { User } from "../models/User";
import moment from "moment";

export interface Photo {
  comment: string;
  author: User;
  timestamp: Date;
  url: string;
}

export interface Menu {
  dishes: string[];
  timestamp: Date;
  photos: Photo[];
}

interface MenuResponse extends BaseResponse {
  menu: Menu[];
}

export class MenuClient {
  private client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }

  async getMenu(start: Date, end: Date): Promise<Menu[]> {
    const res: IRestResponse<MenuResponse> = await this.client.get("/menu", {
      queryParameters: {
        params: { start: moment(start).unix(), end: moment(end).unix() }
      }
    });

    return res.result.menu;
  }
}
