import { getCacheHeader } from "./cache";

describe("Cache-Control header generation tests", () => {
  it("returns the correct fields", () => {
    const fields = getCacheHeader({
      maxAge: 100,
      staleWhileRevalidate: 10,
    }).split(", ");

    expect(fields).toContain("max-age=100");
    expect(fields).toContain("stale-while-revalidate=10");
  });

  it("ignores null and undefined values but not falsy values", () => {
    expect(getCacheHeader({ maxAge: null, sharedMaxAge: undefined })).toBe("");
    expect(getCacheHeader({ staleWhileRevalidate: 0 })).toBe("stale-while-revalidate=0");
  });
});
