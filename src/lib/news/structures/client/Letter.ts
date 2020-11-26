import ky from "ky-universal";
import useSWR, { responseInterface } from "swr";
import { getAuthorizationHeader } from "../../../auth/token";
import { Letter, LetterStatic } from "../shared/Letter";

export class ClientLetter extends Letter {
  public static get fetchAllUrl(): string {
    return `/api/news/letters`;
  }

  public static fetchUrl(id: string): string {
    return `${this.fetchAllUrl}/${id}`;
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

  public static async fetch(id: string): Promise<ClientLetter> {
    const res = await ky
      .get(this.fetchUrl(id), {
        headers: {
          authorization: await getAuthorizationHeader(),
        },
      })
      .json<LetterStatic>();

    return new ClientLetter(res);
  }

  public static useAll(): responseInterface<ClientLetter[], unknown> {
    return useSWR(this.fetchAllUrl, () => this.fetchAll());
  }

  public static use(id: string): responseInterface<ClientLetter, unknown> {
    return useSWR(this.fetchUrl(id), () => this.fetch(id));
  }

  public get description(): string {
    const regex = /Veckobrev Ovalen v.( ?)[0-9]+/gi;

    const matchIndex = Math.max(this.content.search(regex), 0);
    const matchLength = this.content.match(regex)?.[0]?.length || 0;

    return this.content.slice(matchIndex + matchLength).trim();
  }
}
