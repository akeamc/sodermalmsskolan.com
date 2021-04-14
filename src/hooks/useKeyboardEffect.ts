import { useEffect } from "react";

export type KeyboardEventType = "keydown" | "keyup";
export type KeyboardEffectCallback = (event: KeyboardEvent) => void;

/**
 * Runs the specified callback for every keyboard-related event.
 *
 * @param {KeyboardEffectCallback} listener Listener.
 * @param {KeyboardEventType} eventType The type of keyboard event.
 */
const useKeyboardEffect = (listener: KeyboardEffectCallback, eventType: KeyboardEventType = "keydown"): void => {
  useEffect(() => {
    window.addEventListener(eventType, listener);

    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [eventType, listener]);
};

export default useKeyboardEffect;
