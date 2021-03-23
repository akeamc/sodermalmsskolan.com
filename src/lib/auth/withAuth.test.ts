/**
 * @jest-environment node
 */

import { NextApiHandler } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import withAuth from "./withAuth";

describe("auth \"middleware\" tests", () => {
  const handler: NextApiHandler<string> = withAuth((_req, res, decoded) => res.send(decoded.uid));

  it("should return an error if an invalid or no token is provided", async () => {
    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch();

        expect(res.status).toBe(401);
      },
    });

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          headers: {
            authorization: "Bearer INVALID-TOKEN",
          },
        });

        expect(res.status).toBe(403);
      },
    });
  });
});
