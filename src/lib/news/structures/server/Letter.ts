import { DISCORD_CHANNELS } from "../../../discord/constants";
import { ServerMessage } from "../../../discord/structures/server/Message";
import { Letter, LetterAttachment } from "../shared/Letter";
import pdf from "pdf-parse";
import got from "got/dist/source";
import { Message } from "../../../discord/structures/shared/Message";

export interface PDFParseResult {
  text: string;
}

export class ServerLetter extends Letter {
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
    detailed = false
  ): Promise<ServerLetter | null> {
    const attachment = message.attachments[0];

    if (!attachment) {
      return null;
    }

    const { url } = attachment;

    const letter = new ServerLetter({
      id: message.id,
      title: message.content,
      timestamp: message.createdAt.toISOString(),
      url,
    });

    if (detailed) {
      const data = await ServerLetter.parsePdf(url);

      letter.attachment = data;
    }

    return letter;
  }

  public static async fetchAll(): Promise<ServerLetter[]> {
    const messages = await ServerMessage.fetchMany(DISCORD_CHANNELS.news.id);

    const results = await Promise.all(
      messages.map((message) => ServerLetter.fromMessage(message, false))
    );

    return results.filter((message) => !!message);
  }

  public static async fetch(id: string): Promise<ServerLetter> {
    const message = await ServerMessage.fetch(DISCORD_CHANNELS.news.id, id);

    return ServerLetter.fromMessage(message, true);
  }
}
