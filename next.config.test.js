const config = require("./next.config.js");

test("production API url", () => {
  expect(config.env.apiUrl).toBe("https://api.xn--sdermalmsskolan-8sb.com");
});