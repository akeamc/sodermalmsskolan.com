import { useAuth } from "../auth/AuthContext";
import { loginLink } from "../auth/href";
import RouteCategory from "./category";
import Route from "./route";

/**
 * Well-known routes on the website.
 */
type Routes = RouteCategory[];

export const useBasicRoutes = (): Route[] => (
  [
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
    {
      name: "Nyheter",
      href: "/nyheter",
    },
  ]);

/**
 * React hook to use the routes.
 */
export const useRoutes = (): Routes => {
  const { user } = useAuth();

  return [
    {
      name: "Navigera",
      routes: [{
        name: "Start",
        href: "/",
      },
      ...useBasicRoutes()],
    },
    {
      name: "Organisationen",
      routes: [{
        name: "Författare",
        href: "/författare",
      }],
    },
    {
      name: "Resurser",
      routes: [
        {
          name: "Maträtter",
          href: "/maträtter",
        },
        {
          name: "Serverstatus",
          href: "https://status.södermalmsskolan.com",
        },
      ],
    },
    {
      name: "Konto",
      routes: user ? [
        {
          name: "Konto",
          href: "/konto",
        },
      ] : [
        {
          name: "Logga in",
          href: loginLink(),
        },
      ],
    },
  ];
};

export default Routes;
