import ky from "ky-universal";
import useSWR, { responseInterface } from "swr";
import { getAuthorizationHeader } from "../../../auth/token";
import { Letter, LetterStatic } from "../shared/Letter";

export class ClientLetter extends Letter {
  public static get fetchAllUrl(): string {
    return `/api/news/letters`;
  }

  public static async fetchAll(): Promise<ClientLetter[]> {
    const res = await ky
      .get(this.fetchAllUrl, {
        headers: {
          authorization: await getAuthorizationHeader(),
        },
      })
      .json<LetterStatic[]>();

    return res.map((letter) => new ClientLetter(letter));
  }

  public static useAll(): responseInterface<ClientLetter[], unknown> {
    return useSWR(this.fetchAllUrl, () => this.fetchAll());
  }

  public get description(): string {
    const regex = /Veckobrev Ovalen v.( ?)[0-9]+/gi;

    const matchIndex = Math.max(this.content.search(regex), 0);
    const matchLength = this.content.match(regex)?.[0]?.length || 0;

    return this.content.slice(matchIndex + matchLength).trim();
  }
}
