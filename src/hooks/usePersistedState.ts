import createPersistedState from "use-persisted-state";
import {
  useState, useEffect, Dispatch, SetStateAction,
} from "react";

/**
 * A persistent, SSR-compliant, `useState`.
 * @param key
 * @param initialValue
 */
const usePersistedState = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const usePeristed = createPersistedState(key);

  const [persistedState, setPersistedState] = usePeristed<T>(initialValue);
  const [temporaryState, setTemporaryState] = useState<T>(initialValue);

  useEffect(() => {
    setTemporaryState(persistedState);
  }, [persistedState]);

  return [temporaryState, setPersistedState];
};

export default usePersistedState;
