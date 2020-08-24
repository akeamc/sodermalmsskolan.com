export const OAUTH2_OPTIONS = {
  id: process.env.OAUTH_ID,
  secret: process.env.OAUTH_SECRET,
  callback: process.env.OAUTH_CALLBACK_URL,
  scope: "identify",
};

export const COOKIE_NAME = "authentication";
