const analyzeEnabled = process.env.ANALYZE === "true";

if (analyzeEnabled) {
  console.info("Analyzing bundle ...");
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: analyzeEnabled,
});

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ["sv-SE"],
    defaultLocale: "sv-SE",
  },
});
