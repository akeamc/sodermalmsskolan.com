import React, { ReactNode, ReactElement } from "react";
import { auth } from "../lib/firebase/firebase";
import firebase from "firebase";
import { toast } from "react-toastify";

type AuthContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: firebase.User | null;
};

const AuthContext = React.createContext<AuthContext>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
});

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<firebase.User>(null);

  React.useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });
    };

    initializeAuth();
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
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

export function signOut(): void {
  auth
    .signOut()
    .then(() => {
      toast("Du har loggats ut.");
    })
    .catch((error) => {
      toast(error.message, { type: "error" });
    });
}

export function sendEmailVerification(): void {
  auth.currentUser
    .sendEmailVerification()
    .then(() => {
      toast(
        `Ett mejl för att bekräfta e-postadressen har skickats till ${auth.currentUser.email}.`
      );
    })
    .catch((error) => {
      toast(error.message, { type: "error" });
    });
}

export function sendLoginSuccessToast(email: string): void {
  toast(`Inloggad som ${email}.`, { type: "success" });
}

export function useIsAuthenticated(): boolean {
  const context = useAuth();
  return context.isAuthenticated;
}
