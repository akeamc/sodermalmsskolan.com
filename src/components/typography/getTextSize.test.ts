import textSize from "./getTextSize";

describe("text size test", () => {
  it("returns the expected sizes", () => {
    expect(textSize(1)).toBe(12);
    expect(textSize(6)).toBe(24);
    expect(textSize(17)).toBe(92);
  });
});
