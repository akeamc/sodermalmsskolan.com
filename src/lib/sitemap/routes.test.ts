import { renderHook } from "@testing-library/react-hooks";
import ky from "ky-universal";
import Route from "./route";
import { useRoutes } from "./routes";

describe("useRoutes test", () => {
  const { result } = renderHook(() => useRoutes());

  const categories = result.current;

  const externalRoutes: Route[] = categories
    .flatMap((category) => category.routes)
    .filter(({ href }) => href.indexOf("//") >= 0);

  externalRoutes.forEach(({ href }) => {
    test(`${href} is not a dead link`, async () => {
      const res = await ky.get(href);

      expect(res.ok).toBe(true);
    });
  });
});
