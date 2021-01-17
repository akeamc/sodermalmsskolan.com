import { useAuth } from "../auth/AuthContext";
import { loginLink } from "../auth/href";
import { DISCORD_INVITE_LINK } from "../discord/constants";
import RouteCategory from "./category";
import Route from "./route";

/**
 * Well-known routes on the website.
 */
type Routes = RouteCategory[];

/**
 * React hook that returns the basic routes on the site, such as those in the navbar.
 *
 * @returns {Route[]} The basic routes.
 */
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
 *
 * @returns {Routes[]} An array of `Routes`, i.e. *routess*.
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
      routes: [
        {
          name: "Författare",
          href: "/författare",
        },
        {
          name: "Instagram",
          href: "https://instagram.com/sodermalmsskolan.c0m",
        },
        {
          name: "Discord",
          href: DISCORD_INVITE_LINK,
        },
      ],
    },
    {
      name: "Resurser",
      routes: [
        {
          name: "Maträtter",
          href: "/maträtter",
        },
        {
          name: "Quizlet",
          href: "/quizlet",
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
