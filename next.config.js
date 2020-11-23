/* eslint-disable */
require("dotenv").config();

module.exports = {
  cssModules: true,
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.externals = ["tls", "net", "fs"];
    }

    return config;
  },
  images: {
    domains: [
      "blogg.xn--sdermalmsskolan-8sb.com",
      "images.unsplash.com",
      "cdn.discordapp.com",
    ],
  },
  i18n: {
    // Be sure to include the DayJS locales in the root!
    locales: ["sv"],
    defaultLocale: "sv",
  },
};
