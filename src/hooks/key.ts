import { useEffect, useState } from "react";

export type KeyboardEventHandler = (event: KeyboardEvent) => void;

export const useKeyEvents = (
  matchKey: (string) => boolean,
  handleDown: KeyboardEventHandler = () => null,
  handleUp: KeyboardEventHandler = () => null
): void => {
  return useEffect(() => {
    const onDown: KeyboardEventHandler = (event) => {
      if (matchKey(event.key)) {
        handleDown(event);
      }
    };

    const onUp: KeyboardEventHandler = (event) => {
      if (matchKey(event.key)) {
        handleUp(event);
      }
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [handleDown, handleUp, matchKey]);
};

const useKey = (key: string): boolean => {
  const [pressed, setPressed] = useState(false);

  useKeyEvents(
    (code) => code === key,
    () => setPressed(true),
    () => setPressed(false)
  );

  return pressed;
};

export default useKey;
