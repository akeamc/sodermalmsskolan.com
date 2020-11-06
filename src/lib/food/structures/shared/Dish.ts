import { Serializable } from "../../../common/Serializable";
import { Vote, VoteStatic } from "./Vote";

export interface IDish {
  title: string;
  id: string;
  co2e?: number;
  votes?: VoteStatic[];
}

export class Dish implements Serializable<IDish> {
  title: string;
  id: string;
  co2e?: number;
  votes?: Vote[];

  constructor({ title, id, co2e, votes }: IDish) {
    this.title = title;
    this.id = id;
    this.co2e = co2e;
    this.votes = votes?.map((vote) => new Vote(vote));
  }

  public serialize(): IDish {
    return {
      title: this.title,
      id: this.id,
      co2e: this.co2e,
      votes: this.votes?.map((vote) => vote.serialize()),
    };
  }

  public get positiveVotes(): Vote[] {
    return this.votes?.filter((vote) => vote.positive);
  }

  public get negativeVotes(): Vote[] {
    return this.votes?.filter((vote) => !vote.positive);
  }

  public get positiveShare(): number {
    return this.positiveVotes?.length / Math.max(this.votes?.length, 1);
  }
}
