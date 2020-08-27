// utils/analytics.js
import ReactGA from "react-ga";

export const initGA = () => {
  console.info("GA init");
  ReactGA.initialize("UA-142613195-1");
};

export const logPageView = () => {
  console.info(`Logging pageview for ${window.location.pathname}`);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "") => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
