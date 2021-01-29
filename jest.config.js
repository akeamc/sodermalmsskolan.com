module.exports = {
  snapshotSerializers: ["@emotion/jest/serializer"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts"
  },
};
