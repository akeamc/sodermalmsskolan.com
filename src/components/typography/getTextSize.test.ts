import getTextSize from "./getTextSize";

describe("text size test", () => {
  it("returns the expected sizes", () => {
    expect(getTextSize(1)).toBe(12);
    expect(getTextSize(6)).toBe(24);
    expect(getTextSize(17)).toBe(92);
  });

  it("throws if invalid integers are provided", () => {
    expect(() => getTextSize(0)).toThrow();
  });
});
