import parseMessage from "./parseMessage";

describe("parseMessage test", () => {
  it("returns nothing if there are no attachments", async () => {
    const result = await parseMessage({
      attachments: [],
      content: "random content",
      createdAt: new Date().toISOString(),
      id: "dummy id",
    });

    expect(result).toBeUndefined();
  });
});
