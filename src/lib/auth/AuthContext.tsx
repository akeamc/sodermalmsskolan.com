import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase";
import { auth } from "../firebase/firebase";

export interface AuthContextData {
  user: firebase.User,
  isLoading: boolean,
}

const initialAuthContext: AuthContextData = {
  user: undefined,
  isLoading: true,
};

const AuthContext = createContext<AuthContextData>(initialAuthContext);

const onAuthStateChange = (setUser: (user: firebase.User) => void) => auth
  .onAuthStateChanged(setUser);

export const AuthProvider: FunctionComponent = (props) => {
  const [user, setUser] = useState<firebase.User>(initialAuthContext.user);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((newUser) => {
      setUser(newUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      {...props}
      value={{
        user,
        isLoading,
      }}
    />
  );
};

export const useAuth = (): AuthContextData => useContext(AuthContext);

export default AuthContext;
