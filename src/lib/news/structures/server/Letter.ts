import { DISCORD_CHANNELS } from "../../../discord/constants";
import { ServerMessage } from "../../../discord/structures/server/Message";
import { Letter } from "../shared/Letter";
import pdf from "pdf-parse";
import got from "got/dist/source";
import { Message } from "../../../discord/structures/shared/Message";

export interface PDFParseResult {
  text: string;
}

export class ServerLetter extends Letter {
  public static async parsePdf(url: string): Promise<PDFParseResult> {
    const buf = await got.get(url).buffer();

    const data = await pdf(buf);

    return {
      text: data.text,
    };
  }

  public static async fromMessage(
    message: Message
  ): Promise<ServerLetter | null> {
    const attachment = message.attachments[0];

    if (!attachment) {
      return null;
    }

    const { url } = attachment;

    const parsed = await ServerLetter.parsePdf(url);

    return new ServerLetter({
      title: message.content,
      content: parsed.text,
      timestamp: message.createdAt.toISOString(),
      url,
    });
  }

  public static async fetchAll(): Promise<ServerLetter[]> {
    const messages = await ServerMessage.fetchMany(DISCORD_CHANNELS.news.id);

    const results = await Promise.all(messages.map(ServerLetter.fromMessage));

    return results.filter((message) => !!message);
  }
}
