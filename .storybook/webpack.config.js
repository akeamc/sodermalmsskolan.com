const path = require("path");
module.exports = function({ config }) {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }], require.resolve("@emotion/babel-preset-css-prop")],
      babelrc: false,
    },
  });

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
