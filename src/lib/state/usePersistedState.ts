import createPersistedState from "use-persisted-state";
import {
  useMemo,
} from "react";
import { ReactState } from "./ReactState";

/**
 * A persistent, SSR-compliant, `useState`.
 *
 * @param {string} key The key to use in storage.
 * @param {string} initialValue The initial, or default, value.
 *
 * @returns {ReactState} The persistent state, with getters and setters.
 */
const usePersistedState = <T>(
  key: string,
  initialValue: T,
): ReactState<T> => {
  const usePeristed = useMemo(() => createPersistedState(key), [key]);

  return usePeristed<T>(initialValue);
};

export default usePersistedState;
