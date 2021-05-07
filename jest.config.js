module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.stories.{ts,tsx}"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jsdom",
};
