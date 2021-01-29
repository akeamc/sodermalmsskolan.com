import findEndOfMath from "./findEndOfMath";

describe("find end of math test", () => {
  it("finds the end of the math", () => {
    expect(findEndOfMath("\\)", "To calculate the height of a triangle, use the famous \\frac{bh}{2}\\) formula.", 0)).toBe(66);
  });

  it("returns -1 if no math is to be found", () => {
    expect(findEndOfMath("\\)", "a^2+b^2=c^2 \text{whoops there is no right delimeter}")).toBe(-1);
  });
});
