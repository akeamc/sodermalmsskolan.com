import ky, { HTTPError } from "ky-universal";
import useSWR from "swr";
import getAuthorizationHeader from "../../../auth/header";
import { IdQuery } from "../../../common/query";
import { UseSWRResource } from "../../../common/usable";
import Letter, { LetterStatic } from "../shared/letter";

export default class ClientLetter extends Letter {
  public static get fetchAllUrl(): string {
    return "/api/news/letters";
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
}

export const useLetters: UseSWRResource<
ClientLetter[],
Record<string, never>,
HTTPError
> = () => useSWR(ClientLetter.fetchAllUrl,
  () => ClientLetter.fetchAll());

export const useLetter: UseSWRResource<ClientLetter, IdQuery> = ({ id }) => useSWR(
  ClientLetter.fetchUrl(id),
  () => ClientLetter.fetch(id),
);
