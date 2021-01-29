import { auth } from "../firebase/firebase";

/**
 * Get a Firebase Authorization HTTP header to authenticate with the API.
 *
 * @returns {Promise<string | null>} The `Authorization` bearer header, given that someone is
 * logged in. If the user hasn't logged in, `null` is returned.
 */
const getAuthorizationHeader = async (): Promise<string | null> => {
  if (!auth.currentUser) {
    return null;
  }

  const token = await auth.currentUser?.getIdToken();

  return `Bearer ${token}`;
};

export default getAuthorizationHeader;
