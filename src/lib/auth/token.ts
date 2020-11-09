import { auth } from "../firebase/firebase";

/**
 * Get a Firebase Authorization HTTP header to authenticate with the API.
 */
export const getAuthorizationHeader = async (): Promise<string> => {
  const token = await auth.currentUser?.getIdToken();

  return `Bearer ${token}`;
};
