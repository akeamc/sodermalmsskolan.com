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
};
