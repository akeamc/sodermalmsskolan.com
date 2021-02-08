import { renderHook } from "@testing-library/react-hooks";
import useLocale from "./useLocale";

describe("useLocale tests", () => {
  it("returns the correct locale", () => {
    const { result } = renderHook(() => useLocale());

    expect(result.current.language).toBe("sv");
    expect(result.current.locale).toBe("sv-SE");
  });
});
