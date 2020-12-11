import ky from "ky-universal";
import useSWR from "swr";
import { getAuthorizationHeader } from "../../../auth/token";
import { IdQuery } from "../../../common/query";
import { UseSWRResource } from "../../../common/usable";
import Letter, { LetterStatic } from "../shared/letter";

export default class ClientLetter extends Letter {
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
    if (!id) {
      return undefined;
    }

    const res = await ky
      .get(this.fetchUrl(id), {
        headers: {
          authorization: await getAuthorizationHeader(),
        },
      })
      .json<LetterStatic>();

    return new ClientLetter(res);
  }

  public get description(): string {
    const regex = /Veckobrev Ovalen v.( ?)[0-9]+/gi;

    const content = this.attachment?.content || "";

    const matchIndex = Math.max(content.search(regex), 0);
    const matchLength = content.match(regex)?.[0]?.length || 0;

    return content.slice(matchIndex + matchLength).trim();
  }
}

export const useLetters: UseSWRResource<ClientLetter[]> = () => useSWR(ClientLetter.fetchAllUrl, () => ClientLetter.fetchAll());

export const useLetter: UseSWRResource<ClientLetter, IdQuery> = ({ id }) => useSWR(ClientLetter.fetchUrl(id), () => ClientLetter.fetch(id));
