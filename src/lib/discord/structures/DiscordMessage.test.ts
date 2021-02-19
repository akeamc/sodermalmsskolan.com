/**
 * @jest-environment node
 */

import { Message, SnowflakeUtil, TextChannel } from "discord.js";
import { toDiscordMessage } from "./DiscordMessage";

describe("DiscordMessage conversion", () => {
  it("converts correctly", () => {
    const createdAt = new Date();

    const id = SnowflakeUtil.generate(createdAt);

    const message = new Message(null, {
      content: "message content",
      id,
      createdAt,
    }, {} as TextChannel);

    expect(toDiscordMessage(message)).toEqual({
      attachments: [],
      content: "message content",
      createdAt: createdAt.toISOString(),
      id,
    });
  });
});
