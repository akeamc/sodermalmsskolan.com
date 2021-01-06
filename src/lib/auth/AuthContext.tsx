import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase";
import { auth } from "../firebase/firebase";

export type UserSetter = (user: firebase.User) => void;

export interface AuthContextData {
  user: firebase.User,
  isLoading: boolean,
}

const initialAuthContext: AuthContextData = {
  user: undefined,
  isLoading: true,
};

const AuthContext = createContext<AuthContextData>(initialAuthContext);

/**
 * Firebase Authentication state change handler.
 *
 * @param {UserSetter} setUser Function to set the user.
 * @returns {firebase.Unsubscribe} The handler.
 */
const onAuthStateChange = (setUser: UserSetter) => auth
  .onAuthStateChanged(setUser);

/**
 * Authentication provider.
 *
 * @param {any} props Common props.
 * @returns {React.ReactElement} The provider.
 */
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

/**
 * React hook to use the authentication context.
 *
 * @returns {AuthContextData} The context.
 */
export const useAuth = (): AuthContextData => useContext(AuthContext);

export default AuthContext;
