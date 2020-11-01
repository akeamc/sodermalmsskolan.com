import { OAUTH2 } from "./constants";
import got from "got";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export const fetchToken = async (code: string): Promise<TokenResponse> => {
  const response = await got
    .post("https://discord.com/api/oauth2/token", {
      form: {
        client_id: OAUTH2.id,
        client_secret: OAUTH2.secret,
        grant_type: "authorization_code",
        code,
        redirect_uri: OAUTH2.callback,
        scope: OAUTH2.scope,
      },
    })
    .json<TokenResponse>();

  return response;
};
