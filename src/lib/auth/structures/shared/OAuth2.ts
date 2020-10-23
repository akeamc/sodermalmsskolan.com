export interface AuthorizationQueryString extends Record<string, string> {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state?: string;
}

export interface AuthorizationStateStatic {
  redirect?: string;
}

export class AuthorizationState {
  private _redirect?: string;

  constructor({ redirect }: AuthorizationStateStatic) {
    this._redirect = redirect;
  }

  public get static(): AuthorizationStateStatic {
    return {
      redirect: this._redirect,
    };
  }

  public stringify(): string {
    return JSON.stringify(this.static);
  }

  public get redirect(): string {
    return this._redirect || "/konto";
  }

  public static parse(input: string): AuthorizationState {
    const object: AuthorizationStateStatic = JSON.parse(input);

    return new AuthorizationState(object);
  }
}
