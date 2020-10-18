import { useEffect, useState } from "react";

const useKey = (key: string): boolean => {
  const [pressed, setPressed] = useState(false);
  const match = (event: KeyboardEvent) => key == event.key;

  const onDown = (event: KeyboardEvent) => {
    if (match(event)) setPressed(true);
  };

  const onUp = (event: KeyboardEvent) => {
    if (match(event)) setPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [key]);

  return pressed;
};

export default useKey;
