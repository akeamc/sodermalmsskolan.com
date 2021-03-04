import { GHOST_API_CREDENTIAL } from "./api";

describe("ghost API client test", () => {
  it("has a valid URL", () => {
    const { url } = GHOST_API_CREDENTIAL;

    expect(/^https?:\/\//.test(url)).toBe(true);
    expect(url.endsWith("/")).toBe(false);
  });

  it("has a correctly formatted key", () => {
    const regExp = /^[0-9a-f]{26}$/;

    expect(regExp.test(GHOST_API_CREDENTIAL.key)).toBe(true);
    expect(regExp.test("abcdefabcdefabcdefabcdef")).toBe(false); // 24 characters.
    expect(regExp.test("ey".repeat(13))).toBe(false);
  });
});
