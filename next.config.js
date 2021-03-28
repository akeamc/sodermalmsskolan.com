require("dotenv").config();

const analyzeEnabled = process.env.ANALYZE === "true";

if (analyzeEnabled) {
  console.info("Analyzing bundle ...");
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: analyzeEnabled,
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
