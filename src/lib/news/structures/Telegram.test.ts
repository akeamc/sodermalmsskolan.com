/**
 * @jest-environment node
 */

import { SnowflakeUtil } from "discord.js";
import DiscordMessage from "../../discord/structures/DiscordMessage";
import { telegramFromMessage } from "./Telegram";

describe("telegram test", () => {
  it("parses correctly", () => {
    const now = new Date();

    const message: DiscordMessage = {
      createdAt: now.toISOString(),
      content: "breaking news!",
      id: SnowflakeUtil.generate(now),
      attachments: [],
    };

    expect(telegramFromMessage(message)).toEqual({
      timestamp: message.createdAt,
      content: message.content,
      id: message.id,
    });
  });
});
