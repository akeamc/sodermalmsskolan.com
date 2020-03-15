import { User } from "./../models/User";
import { RestClient } from 'typed-rest-client';
import { BaseResponse } from './api';
import { IRestResponse } from 'typed-rest-client';

export interface StudySet {
  timestamp: Date;
  author: User;
  url: string;
  name: string;
  categories: string[];
}

interface QuizletResponse extends BaseResponse {
  sets: StudySet[];
}

export class QuizletClient {
  private client: RestClient;

  constructor(client: RestClient) {
    this.client = client;
  }

  async getStudySets(): Promise<
    StudySet[]
  > {
    const res: IRestResponse<QuizletResponse> = await this.client.get("/quizlet");

    return res.result.sets;
  }
}
