/**
 * @jest-environment node
 */

import { MessageAttachment, SnowflakeUtil } from "discord.js";
import { toDiscordAttachment } from "./DiscordAttachment";

describe("DiscordAttachment tests", () => {
  it("converts correctly", () => {
    const now = new Date();
    const id = SnowflakeUtil.generate(now);

    const attachment = new MessageAttachment("", "cool video", {
      id,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });

    expect(toDiscordAttachment(attachment)).toEqual({
      id,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });
  });
});
