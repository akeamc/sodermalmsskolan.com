import ky from "ky-universal";
import getAuthorizationHeader from "../../auth/header";
import DiscordObject from "../../discord/structures/DiscordObject";
import LetterAttachment from "./LetterAttachment";

/**
 * A letter, derived from a Discord `Message` with a PDF attachment.
 */
export default interface Letter extends DiscordObject {
  title: string;
  attachment: LetterAttachment;

  /**
   * ISO8601 string of the publish date.
   */
  timestamp: string;
  url: string;
}

export const fetchUrl = "/api/news/letters";

/**
 * Fetch all letters. Requires the user to be authenticated.
 *
 * @returns {Letter[]} The letters.
 */
export const fetchLetters = async (): Promise<Letter[]> => ky
  .get(fetchUrl, {
    headers: {
      authorization: await getAuthorizationHeader(),
    },
  })
  .json<Letter[]>();
