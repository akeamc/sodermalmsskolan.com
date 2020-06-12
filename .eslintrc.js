module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  globals: {
    React: "writable",
  },
};
