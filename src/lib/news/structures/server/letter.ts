import pdf from "pdf-parse";
import got from "got/dist/source";
import { DISCORD_CHANNELS } from "../../../discord/constants";
import { ServerMessage } from "../../../discord/structures/server/Message";
import Letter, { LetterAttachment } from "../shared/letter";
import { Message } from "../../../discord/structures/shared/Message";

export default class ServerLetter extends Letter {
  public static async parsePdf(url: string): Promise<LetterAttachment> {
    const buf = await got.get(url).buffer();

    const data = await pdf(buf);

    return {
      content: data.text,
      pages: data.numpages,
    };
  }

  public static async fromMessage(
    message: Message,
  ): Promise<ServerLetter | null> {
    const attachment = message.attachments[0];

    if (!attachment) {
      return undefined;
    }

    const { url } = attachment;

    return new ServerLetter({
      id: message.id,
      title: message.content,
      timestamp: message.createdAt.toISOString(),
      attachment: await ServerLetter.parsePdf(url),
      url,
    });
  }

  public static async fetchAll(): Promise<ServerLetter[]> {
    const messages = await ServerMessage.fetchMany(DISCORD_CHANNELS.news.id);

    const results = await Promise.all(
      messages.map((message) => ServerLetter.fromMessage(message)),
    );

    return results.filter((message) => !!message);
  }

  public static async fetch(id: string): Promise<ServerLetter> {
    const message = await ServerMessage.fetch(DISCORD_CHANNELS.news.id, id);

    return ServerLetter.fromMessage(message);
  }
}
