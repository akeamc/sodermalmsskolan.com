import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: "https://blogg.xn--sdermalmsskolan-8sb.com",
  key: "928358fd805a660d5ffbc84e3d",
  version: "v3",
});

export default api;
