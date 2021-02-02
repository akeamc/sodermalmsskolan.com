import { media } from "./breakpoints";

describe("breakpoints test", () => {
  it("returns the correct @media tags", () => {
    const num = Math.ceil(Math.random() * 2000);

    expect(media(num)).toBe(`@media screen and (min-width: ${num}px)`);
  });
});
