import { renderHook } from "@testing-library/react-hooks";
import ky from "ky-universal";
import Route from "./route";
import { useRoutes } from "./routes";

describe("useRoutes test", () => {
  const { result } = renderHook(() => useRoutes());

  const categories = result.current;

  const routes: Route[] = categories.reduce((acc, category) => acc.concat(...category.routes), []);

  routes.forEach((route) => {
    test(`${route.href} is not dead`, async () => {
      const res = await ky.get(route.href);

      expect(res.ok).toBe(true);
    });
  });
});
