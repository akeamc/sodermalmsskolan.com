import RouteCategory from "./category";

/**
 * Well-known routes on the website.
 */
type Routes = RouteCategory[];

/**
 * React hook to use the routes.
 */
export const useRoutes = (): Routes => [
  {
    name: "Navigera",
    routes: [
      {
        name: "Start",
        href: "/",
      },
      {
        name: "Meny",
        href: "/meny",
      },
    ],
  },
  {
    name: "Resurser",
    routes: [
      {
        name: "Serverstatus",
        href: "https://status.södermalmsskolan.com",
      },
    ],
  },
  {
    name: "Resurser",
    routes: [
      {
        name: "Serverstatus",
        href: "https://status.södermalmsskolan.com",
      },
    ],
  },
];

export default Routes;
