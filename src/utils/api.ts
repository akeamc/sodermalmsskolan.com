import { RestClient } from "typed-rest-client";
import { MenuClient } from "./menu";
import { QuizletClient } from './quizlet';
import { FanartClient } from "./fanart";

export interface BaseResponse {
  meta: {
    total: number;
  }
}

export class APIClient {
  private client: RestClient;

  baseUrl: string;
  menu: MenuClient;
  quizlet: QuizletClient;
  fanart: FanartClient;

  constructor(baseUrl: string = process.env.apiUrl) {
    this.baseUrl = baseUrl;
    this.client = new RestClient("sodermalmsskolan-api", this.baseUrl);
    this.menu = new MenuClient(this.client);
    this.quizlet = new QuizletClient(this.client);
    this.fanart = new FanartClient(this.client);
  }
}
