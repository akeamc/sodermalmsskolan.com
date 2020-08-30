/* eslint-disable */
require("dotenv").config();
const path = require("path");

module.exports = {
  cssModules: true,
  cssLoaderOptions: {
    // localIdentName: "[name]__[local]",
    getLocalIdent: (loaderContext, localIdentName, localName, options) => {
      const fileName = path.basename(loaderContext.resourcePath);
      if (fileName.indexOf(".module") !== -1) {
        const name = fileName.replace(/[\.]/g, "");
        return `${name}__${localName}`;
      } else {
        return localName;
      }
    },
  },
  poweredByHeader: false,
  env: {
    adsenseClient: "ca-pub-1944185766034883",
    adsenseSlot: "5909725353",
    discordFoodChannel: process.env.DISCORD_FOOD_CHANNEL,
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.externals = ["tls", "net", "fs"];
    }

    return config;
  },
};
