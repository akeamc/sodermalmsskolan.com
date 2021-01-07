import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase";
import _ from "lodash";
import { auth } from "../firebase/firebase";

export type UserSetter = (user: firebase.User) => void;

export interface AuthContextData {
  user: firebase.User,
  reloadUser: () => Promise<void>,
  isLoading: boolean,
}

const initialAuthContext: AuthContextData = {
  user: undefined,
  reloadUser: () => Promise.resolve(),
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
      setUser(_.cloneDeep(newUser));
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * Reload the user.
   */
  const reloadUser = async () => {
    await auth.currentUser?.reload();

    setUser(_.cloneDeep(auth?.currentUser));
  };

  return (
    <AuthContext.Provider
      {...props}
      value={{
        user,
        reloadUser,
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
