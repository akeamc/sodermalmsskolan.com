import { rest } from "msw";
import { MenuAPIResponse } from "../pages/api/menus";

const handlers = [
  rest.get("/api/menus", (_, res, ctx) => res(
    ctx.json<MenuAPIResponse>([{
      date: "2021-12-31",
      dishes: ["Tacobuffé", "Fisk Björkeby"],
    }, {
      date: "2021-10-12",
      dishes: ["Pasta", "Ris"],
    }, {
      date: "2020-10-10",
      dishes: ["Kyckling", "Potatis"],
    }]),
  )),
];

export default handlers;
