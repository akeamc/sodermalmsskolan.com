import createPersistedState from "use-persisted-state";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

/**
 * A persistent `useState`, compatible with SSR.
 * @param key
 * @param initialValue
 */
export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const usePeristed = createPersistedState(key);

  const [persistedState, setPersistedState] = usePeristed<T>(initialValue);
  const [temporaryState, setTemporaryState] = useState<T>(initialValue);

  useEffect(() => {
    setTemporaryState(persistedState);
  }, [persistedState]);

  return [temporaryState, setPersistedState];
}
