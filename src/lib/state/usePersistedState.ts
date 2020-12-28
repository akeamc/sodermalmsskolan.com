import createPersistedState from "use-persisted-state";
import {
  useMemo,
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
  const usePeristed = useMemo(() => createPersistedState(key), [key]);

  return usePeristed<T>(initialValue);
};

export default usePersistedState;
