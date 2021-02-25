import { renderHook } from "@testing-library/react-hooks";
import ky from "ky-universal";
import { getPage } from "next-page-tester";
import Route from "./route";
import { useRoutes } from "./routes";

describe("useRoutes test", () => {
  const { result } = renderHook(() => useRoutes());

  const categories = result.current;

  const routes: Route[] = categories.reduce((acc, category) => acc.concat(...category.routes), []);

  routes.forEach(({ href }) => {
    test(`${href} is not dead`, async () => {
      const isExternal = href.indexOf("//") >= 0;

      if (isExternal) {
        const res = await ky.get(href);

        expect(res.ok).toBe(true);
      } else {
        const { render } = await getPage({
          route: href,
        });

        render();
      }
    });
  });
});
