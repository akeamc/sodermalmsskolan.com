import React, { ReactNode, ReactElement } from "react";
import { User, IDiscordAPIUser } from "../lib/discord/structures/User";
import ky from "ky-universal";

type AuthContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = React.createContext<AuthContext>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthenticated: () => {},
});

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<User>(null);

  React.useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      let ok = false;

      try {
        const userData = await ky
          .get("/api/auth/status")
          .json<IDiscordAPIUser>();

        setUser(new User(userData));

        ok = true;
      } catch (error) {
        ok = false;
      } finally {
        setAuthenticated(ok);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContext {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useIsAuthenticated(): boolean {
  const context = useAuth();
  return context.isAuthenticated;
}
