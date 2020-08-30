import React, { ReactNode, ReactElement } from "react";
import ky from "ky-universal";
import { AuthUser, IAuthUser } from "../lib/auth/structures/shared/AuthUser";

type AuthContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
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
  const [user, setUser] = React.useState<AuthUser>(null);

  React.useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      let ok = false;

      try {
        const data = await ky.get("/api/auth/status").json<IAuthUser>();

        setUser(AuthUser.parse(data));

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
