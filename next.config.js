/* eslint-disable */
require("dotenv").config();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
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
});
