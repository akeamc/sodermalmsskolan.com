import RouteCategory from "./category";
import Route from "./route";

/**
 * Well-known routes on the website.
 */
type Routes = RouteCategory[];

export const useBasicRoutes = (): Route[] => ([
  {
    name: "Start",
    href: "/",
  },
  {
    name: "Meny",
    href: "/meny",
  },
  {
    name: "Blogg",
    href: "/blogg",
  },
  {
    name: "Schema",
    href: "/schema",
  },
  {
    name: "Digibruh",
    href: "/digibruh",
  },
]);

/**
 * React hook to use the routes.
 */
export const useRoutes = (): Routes => [
  {
    name: "Navigera",
    routes: useBasicRoutes(),
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
