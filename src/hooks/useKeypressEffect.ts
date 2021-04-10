import { useEffect } from "react";

export type KeypressEffectCallback = (event: KeyboardEvent) => void;

/**
 * Runs the specified callback for every `keypress` event.
 *
 * @param {KeypressEffectCallback} listener Listener.
 */
const useKeypressEffect = (listener: KeypressEffectCallback): void => {
  useEffect(() => {
    window.addEventListener("keypress", listener);

    return () => {
      window.removeEventListener("keypress", listener);
    };
  }, [listener]);
};

export default useKeypressEffect;
