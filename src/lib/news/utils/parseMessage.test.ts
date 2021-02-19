/**
 * @jest-environment node
 */

import { SnowflakeUtil } from "discord.js";
import parseMessage from "./parseMessage";

const now = new Date();

describe("parseMessage test", () => {
  it("works", async () => {
    const messageId = SnowflakeUtil.generate(now);

    const result = await parseMessage({
      attachments: [{
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        id: SnowflakeUtil.generate(now),
      }],
      content: "message content",
      createdAt: now.toISOString(),
      id: messageId,
    });

    expect(result).toEqual({
      attachment: {
        content: "\n\nDummy PDF file",
        pages: 1,
      },
      id: messageId,
      timestamp: now.toISOString(),
      title: "message content",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    });
  });

  it("returns nothing if there are no attachments", async () => {
    const result = await parseMessage({
      attachments: [],
      content: "random content",
      createdAt: now.toISOString(),
      id: SnowflakeUtil.generate(now),
    });

    expect(result).toBeUndefined();
  });
});
