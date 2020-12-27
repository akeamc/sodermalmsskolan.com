import createPersistedState from "use-persisted-state";
import {
  useState, useEffect,
} from "react";
import { ReactState } from "./state";

/**
 * A persistent, SSR-compliant, `useState`.
 * @param key
 * @param initialValue
 */
const usePersistedState = <T>(
  key: string,
  initialValue: T,
): ReactState<T> => {
  const usePeristed = createPersistedState(key);

  const [persistedState, setPersistedState] = usePeristed<T>(initialValue);
  const [temporaryState, setTemporaryState] = useState<T>(initialValue);

  useEffect(() => {
    setTemporaryState(persistedState);
  }, [persistedState]);

  return [temporaryState, setPersistedState];
};

export default usePersistedState;
