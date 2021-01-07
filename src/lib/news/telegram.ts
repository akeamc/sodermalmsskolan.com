import { Message } from "../discord/structures/shared/Message";

export default interface Telegram {
  timestamp: string;
  content: string;
  id: string,
}

export const telegramFromMessage = ({ createdAt, content, id }: Message): Telegram => ({
  timestamp: createdAt.toISOString(),
  content,
  id,
});
