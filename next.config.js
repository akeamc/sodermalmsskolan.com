require("dotenv").config();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: [
      "blogg.xn--sdermalmsskolan-8sb.com",
      "images.unsplash.com",
      "unsplash.com",
      "cdn.discordapp.com",
    ],
  },
  i18n: {
    // Be sure to include the DayJS locales in the root!
    locales: ["sv-SE"],
    defaultLocale: "sv-SE",
  },
});
