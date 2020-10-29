import createPersistedState from "use-persisted-state";
import { useState, useEffect } from "react";

export type StateSetter<T> = (value: T) => void;

/**
 * A persistent `useState`, compatible with SSR.
 * @param key
 * @param initialValue
 */
export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, StateSetter<T>] {
  const usePeristed = createPersistedState(key);

  const [persistedState, setPersistedState] = usePeristed<T>(initialValue);
  const [localState, setLocalState] = useState<T>(initialValue);

  useEffect(() => {
    setLocalState(persistedState);
  });

  return [localState, setPersistedState];
}
