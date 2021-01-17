import useSWR, { responseInterface } from "swr";
import ky from "ky-universal";
import getAuthorizationHeader from "../../auth/header";
import INSTAGRAM_BOT_ENDPOINT from "./endpoint";
import { useAuth } from "../../auth/AuthContext";

interface InstagramStatus {
  uid: string;
  username: string;
  verified: boolean;
}

/**
 * Use the status of the Instagram settings.
 *
 * @returns {responseInterface<InstagramStatus, *>} The status.
 */
const useInstagramStatus = (): responseInterface<InstagramStatus, unknown> => {
  const { user } = useAuth();

  return useSWR<InstagramStatus>(() => (user ? "/instagram/status" : undefined), async () => {
    const res = await ky.get(`${INSTAGRAM_BOT_ENDPOINT}/instagram/status`, {
      headers: {
        authorization: await getAuthorizationHeader(),
      },
    }).json<InstagramStatus>();

    return res;
  }, {
    refreshInterval: 10000,
  });
};

export default useInstagramStatus;
